#!/usr/bin/env node
/**
 * GitHub sync via REST API — works even when git push is network-blocked.
 *
 * Strategy:
 *  1. Get the remote branch's current tree (flat, recursive)
 *  2. Get our local HEAD tree (flat)
 *  3. For each differing file:
 *       - small file: upload raw content as a git blob
 *       - large file (> LFS_THRESHOLD): upload content to GitHub LFS via
 *         the LFS Batch API, then upload an LFS pointer file as the git blob
 *  4. Generate a `.gitattributes` entry for every LFS-tracked path so the
 *     repo is a valid LFS repo when cloned
 *  5. Create a new GitHub tree, commit it, and update the branch ref
 */

import { execSync } from "child_process";
import { createHash } from "crypto";
import { existsSync, readFileSync, writeFileSync } from "fs";

const OWNER = "mumudabull";
const REPO = "mumu";
const BRANCH = "main";
const SYNC_STATE_FILE = ".github-sync-sha";
const TOKEN = process.env.GITHUB_TOKEN;
const CONCURRENT_UPLOADS = 8;
const RETRY_LIMIT = 3;
// Files larger than this are uploaded via Git LFS instead of as inline blobs.
// The GitHub REST blob endpoint is slow and memory-heavy for large binaries;
// LFS uses a direct PUT to object storage which is much faster.
const LFS_THRESHOLD = 5 * 1024 * 1024;
// Hard cap on what we will ever read into memory (LFS uploads are streamed
// from a git cat-file buffer, so we still need to hold one file at a time).
const MAX_FILE_BYTES = 2 * 1024 * 1024 * 1024; // 2 GB

if (!TOKEN) {
  console.log("GITHUB_TOKEN not set — skipping GitHub sync");
  process.exit(0);
}

const BASE = `https://api.github.com/repos/${OWNER}/${REPO}`;
const LFS_BATCH_URL = `https://github.com/${OWNER}/${REPO}.git/info/lfs/objects/batch`;
const BASIC_AUTH = "Basic " + Buffer.from(`x-access-token:${TOKEN}`).toString("base64");

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function api(path, opts = {}, attempt = 1) {
  const url = path.startsWith("http") ? path : `${BASE}${path}`;
  const res = await fetch(url, {
    ...opts,
    headers: {
      Authorization: `token ${TOKEN}`,
      Accept: "application/vnd.github.v3+json",
      "Content-Type": "application/json",
      "User-Agent": "replit-github-sync",
      ...opts.headers,
    },
    body: opts.body ? JSON.stringify(opts.body) : undefined,
  });

  if (!res.ok) {
    const text = await res.text();
    const msg = `GitHub API ${path} → ${res.status}: ${text.slice(0, 300)}`;
    if (attempt < RETRY_LIMIT && (res.status === 429 || res.status >= 500)) {
      const wait = attempt * 3000;
      console.warn(`  [retry ${attempt}] ${res.status} — retrying in ${wait / 1000}s`);
      await sleep(wait);
      return api(path, opts, attempt + 1);
    }
    throw new Error(msg);
  }
  return res.json();
}

function git(cmd, extraOpts = {}) {
  return execSync(`git ${cmd}`, { encoding: "utf8", ...extraOpts }).trim();
}

function readBlob(objSha, size) {
  return execSync(`git cat-file blob ${objSha}`, {
    encoding: "buffer",
    maxBuffer: size + 1024,
  });
}

function sha256(buf) {
  return createHash("sha256").update(buf).digest("hex");
}

function lfsPointer(oid, size) {
  return `version https://git-lfs.github.com/spec/v1\noid sha256:${oid}\nsize ${size}\n`;
}

/**
 * Request upload actions for a set of LFS objects via the GitHub LFS Batch
 * API, then PUT each object's content to the returned URL.
 * Objects already present on the server come back without an `actions` field
 * and are silently skipped (they're already uploaded).
 */
async function uploadLfsObjects(objects, contentFor) {
  if (objects.length === 0) return;

  // Batch API accepts many objects in one request; chunk to keep payloads small.
  const CHUNK = 50;
  for (let i = 0; i < objects.length; i += CHUNK) {
    const chunk = objects.slice(i, i + CHUNK);
    const batchRes = await fetch(LFS_BATCH_URL, {
      method: "POST",
      headers: {
        Accept: "application/vnd.git-lfs+json",
        "Content-Type": "application/vnd.git-lfs+json",
        Authorization: BASIC_AUTH,
        "User-Agent": "replit-github-sync",
      },
      body: JSON.stringify({
        operation: "upload",
        transfers: ["basic"],
        objects: chunk.map(({ oid, size }) => ({ oid, size })),
      }),
    });

    if (!batchRes.ok) {
      const text = await batchRes.text();
      throw new Error(`LFS batch → ${batchRes.status}: ${text.slice(0, 300)}`);
    }

    const batch = await batchRes.json();

    // Upload sequentially within a chunk to avoid hammering memory with
    // multiple large files held at once. Across chunks we still process
    // sequentially for the same reason.
    for (const obj of batch.objects ?? []) {
      if (obj.error) {
        throw new Error(`LFS object ${obj.oid}: ${obj.error.message ?? obj.error.code}`);
      }
      const upload = obj.actions?.upload;
      if (!upload) continue; // already present on server
      const content = contentFor(obj.oid);
      const putRes = await fetch(upload.href, {
        method: "PUT",
        headers: {
          "Content-Type": "application/octet-stream",
          "Content-Length": String(obj.size),
          ...(upload.header ?? {}),
        },
        body: content,
      });
      if (!putRes.ok) {
        const text = await putRes.text();
        throw new Error(`LFS PUT ${obj.oid} → ${putRes.status}: ${text.slice(0, 200)}`);
      }
      const verify = obj.actions?.verify;
      if (verify) {
        const vRes = await fetch(verify.href, {
          method: "POST",
          headers: {
            "Content-Type": "application/vnd.git-lfs+json",
            Accept: "application/vnd.git-lfs+json",
            ...(verify.header ?? {}),
          },
          body: JSON.stringify({ oid: obj.oid, size: obj.size }),
        });
        if (!vRes.ok) {
          const text = await vRes.text();
          throw new Error(`LFS verify ${obj.oid} → ${vRes.status}: ${text.slice(0, 200)}`);
        }
      }
    }
  }
}

async function main() {
  const localSha = git("rev-parse HEAD");
  const localMsg = git(`log --format=%s -1 ${localSha}`);
  console.log(`Local HEAD:  ${localSha.slice(0, 7)} "${localMsg}"`);

  if (existsSync(SYNC_STATE_FILE)) {
    const lastSynced = readFileSync(SYNC_STATE_FILE, "utf8").trim();
    if (lastSynced === localSha) {
      console.log("Already synced this commit — nothing to do.");
      return;
    }
  }

  // Get current remote state
  let remoteCommitSha = null;
  let remoteTreeSha = null;
  const remoteFiles = new Map(); // path → blob sha

  try {
    const ref = await api(`/git/refs/heads/${BRANCH}`);
    remoteCommitSha = ref.object.sha;
    const remoteCommit = await api(`/git/commits/${remoteCommitSha}`);
    remoteTreeSha = remoteCommit.tree.sha;
    console.log(`Remote HEAD: ${remoteCommitSha.slice(0, 7)}`);

    const remoteTree = await api(`/git/trees/${remoteTreeSha}?recursive=1`);
    for (const entry of remoteTree.tree) {
      if (entry.type === "blob") {
        remoteFiles.set(entry.path, entry.sha);
      }
    }
    console.log(`Remote tree: ${remoteFiles.size} files`);
  } catch (e) {
    if (!e.message.includes("404")) throw e;
    console.log("Remote branch does not exist yet — creating it");
  }

  // Get local tree
  const localTreeOutput = git("ls-tree -r --long HEAD");
  const localFiles = new Map();
  let skippedTooBig = 0;
  for (const line of localTreeOutput.split("\n").filter(Boolean)) {
    const [meta, path] = line.split("\t");
    const [mode, , objSha, sizeStr] = meta.split(/\s+/);
    const size = parseInt(sizeStr, 10);
    if (size > MAX_FILE_BYTES) {
      skippedTooBig++;
      continue;
    }
    localFiles.set(path, { mode, objSha, size, isLfs: size > LFS_THRESHOLD });
  }

  const lfsCount = [...localFiles.values()].filter((f) => f.isLfs).length;
  console.log(
    `Local tree:  ${localFiles.size} files (${lfsCount} via LFS` +
      (skippedTooBig ? `, skipped ${skippedTooBig} > ${MAX_FILE_BYTES / 1024 / 1024}MB` : "") +
      ")"
  );

  // Build / inject a .gitattributes that LFS-tracks every large path we ship.
  // We do this in the tree we push, not on disk, so local git state is
  // untouched. If the user already maintains a .gitattributes locally, our
  // generated entries are appended to its content.
  const lfsPaths = [...localFiles.entries()]
    .filter(([, f]) => f.isLfs)
    .map(([p]) => p)
    .sort();
  if (lfsPaths.length > 0) {
    const header = "# managed by scripts/github-sync.mjs — LFS-tracked paths";
    const managedBlock =
      header +
      "\n" +
      lfsPaths.map((p) => `${escapeAttrPath(p)} filter=lfs diff=lfs merge=lfs -text`).join("\n") +
      "\n";

    let existing = "";
    const existingEntry = localFiles.get(".gitattributes");
    if (existingEntry && !existingEntry.isLfs) {
      existing = readBlob(existingEntry.objSha, existingEntry.size).toString("utf8");
      // Drop any previously-managed block so re-runs don't accumulate.
      existing = existing.replace(
        new RegExp(`${escapeRegex(header)}[\\s\\S]*?(\\n#|$)`, "g"),
        (_, tail) => (tail.startsWith("\n#") ? tail.slice(1) : "")
      );
      if (existing && !existing.endsWith("\n")) existing += "\n";
    }
    const finalAttrs = existing + managedBlock;

    // Replace the .gitattributes entry in localFiles with our synthesized one,
    // marked as a small blob that we upload inline.
    const fakeSha = "synthetic:" + sha256(Buffer.from(finalAttrs));
    localFiles.set(".gitattributes", {
      mode: "100644",
      objSha: fakeSha,
      size: Buffer.byteLength(finalAttrs),
      isLfs: false,
      syntheticContent: Buffer.from(finalAttrs),
    });
  }

  // Compute diff
  const toUpload = [];
  const toDelete = [];

  for (const [path, entry] of localFiles) {
    const remoteObjSha = remoteFiles.get(path);
    // For LFS-tracked paths the git blob is a small pointer file. We can't
    // pre-compare its SHA against the remote because we don't know the
    // pointer's git blob sha without generating it. Always re-evaluate.
    if (entry.isLfs) {
      toUpload.push({ path, ...entry });
    } else if (remoteObjSha !== entry.objSha) {
      toUpload.push({ path, ...entry });
    }
  }
  for (const path of remoteFiles.keys()) {
    if (!localFiles.has(path)) {
      toDelete.push(path);
    }
  }

  console.log(`Changes: ${toUpload.length} to upload, ${toDelete.length} to delete`);

  let newTreeSha = remoteTreeSha;

  if (toUpload.length > 0 || toDelete.length > 0) {
    // 1) Upload LFS objects first, then build pointer-file content.
    const lfsUploads = toUpload.filter((u) => u.isLfs);
    const lfsContentCache = new Map(); // oid → Buffer (held briefly during upload)
    const pointerByPath = new Map(); // path → pointer string

    if (lfsUploads.length > 0) {
      console.log(`Preparing ${lfsUploads.length} LFS objects…`);
      const lfsObjects = [];
      for (const { path, objSha, size } of lfsUploads) {
        const content = readBlob(objSha, size);
        const oid = sha256(content);
        lfsContentCache.set(oid, content);
        lfsObjects.push({ oid, size });
        pointerByPath.set(path, lfsPointer(oid, size));
      }
      // Deduplicate by oid (same content under multiple paths).
      const seen = new Set();
      const dedup = lfsObjects.filter((o) => (seen.has(o.oid) ? false : (seen.add(o.oid), true)));
      console.log(`Uploading ${dedup.length} LFS objects (${lfsObjects.length - dedup.length} dedup'd)…`);
      let lfsDone = 0;
      await uploadLfsObjects(dedup, (oid) => {
        const c = lfsContentCache.get(oid);
        lfsDone++;
        process.stdout.write(`  ${lfsDone}/${dedup.length} LFS objects\r`);
        return c;
      });
      if (dedup.length > 0) console.log(`  ${dedup.length}/${dedup.length} LFS objects uploaded   `);
    }

    // 2) Upload the small blobs (and LFS pointers) to GitHub as git blobs.
    const blobShaByKey = new Map(); // key (path for lfs/synthetic, objSha otherwise) → githubBlobSha
    let done = 0;
    const inlineUploads = toUpload.length;
    console.log(`Uploading ${inlineUploads} git blobs…`);

    for (let i = 0; i < toUpload.length; i += CONCURRENT_UPLOADS) {
      const batch = toUpload.slice(i, i + CONCURRENT_UPLOADS);
      await Promise.all(
        batch.map(async (entry) => {
          const { path, objSha, size, isLfs, syntheticContent } = entry;
          let content;
          let key;
          if (isLfs) {
            content = Buffer.from(pointerByPath.get(path), "utf8");
            key = `lfs:${path}`;
          } else if (syntheticContent) {
            content = syntheticContent;
            key = `syn:${path}`;
          } else {
            content = readBlob(objSha, size);
            key = objSha;
          }
          const blob = await api("/git/blobs", {
            method: "POST",
            body: { content: content.toString("base64"), encoding: "base64" },
          });
          blobShaByKey.set(key, blob.sha);
          done++;
          process.stdout.write(`  ${done}/${inlineUploads} blobs\r`);
        })
      );
    }
    console.log(`  ${inlineUploads}/${inlineUploads} blobs uploaded   `);

    // Free LFS content buffers.
    lfsContentCache.clear();

    // Build tree entries
    const treeEntries = [];
    for (const entry of toUpload) {
      const { path, mode, objSha, isLfs, syntheticContent } = entry;
      const key = isLfs ? `lfs:${path}` : syntheticContent ? `syn:${path}` : objSha;
      treeEntries.push({ path, mode, type: "blob", sha: blobShaByKey.get(key) });
    }
    for (const path of toDelete) {
      treeEntries.push({ path, mode: "100644", type: "blob", sha: null });
    }

    // Create new tree
    console.log("Creating tree on GitHub…");
    const newTree = await api("/git/trees", {
      method: "POST",
      body: {
        ...(remoteTreeSha ? { base_tree: remoteTreeSha } : {}),
        tree: treeEntries,
      },
    });
    newTreeSha = newTree.sha;
    console.log(`New tree: ${newTree.sha.slice(0, 7)}`);
  }

  // Skip the commit entirely if nothing actually changed.
  if (newTreeSha === remoteTreeSha) {
    console.log("Tree unchanged — nothing to commit.");
    writeFileSync(SYNC_STATE_FILE, localSha);
    return;
  }

  // Create commit
  const commitMessage = `${localMsg}\n\nSynced from Replit (${localSha.slice(0, 7)})`;
  const parents = remoteCommitSha ? [remoteCommitSha] : [];
  const newCommit = await api("/git/commits", {
    method: "POST",
    body: { message: commitMessage, tree: newTreeSha, parents },
  });
  console.log(`New commit: ${newCommit.sha.slice(0, 7)}`);

  // Update or create branch ref — try non-force first, fall back to force
  // only if the remote has diverged (e.g. someone pushed directly to GitHub)
  if (remoteCommitSha) {
    try {
      await api(`/git/refs/heads/${BRANCH}`, {
        method: "PATCH",
        body: { sha: newCommit.sha, force: false },
      });
    } catch (e) {
      if (e.message.includes("422") || e.message.includes("not a fast forward")) {
        console.warn("  Non-fast-forward push — forcing (Replit is source of truth)");
        await api(`/git/refs/heads/${BRANCH}`, {
          method: "PATCH",
          body: { sha: newCommit.sha, force: true },
        });
      } else {
        throw e;
      }
    }
  } else {
    await api("/git/refs", {
      method: "POST",
      body: { ref: `refs/heads/${BRANCH}`, sha: newCommit.sha },
    });
  }

  writeFileSync(SYNC_STATE_FILE, localSha);
  console.log(`\nGitHub sync complete — ${OWNER}/${REPO}:${BRANCH} updated`);
}

function escapeAttrPath(p) {
  // .gitattributes treats spaces as separators; quote paths that contain them.
  return /\s/.test(p) ? `"${p.replace(/"/g, '\\"')}"` : p;
}

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

main().catch((err) => {
  console.error("\nGitHub sync failed:", err.message);
  process.exit(1);
});
