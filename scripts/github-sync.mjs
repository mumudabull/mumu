#!/usr/bin/env node
/**
 * GitHub sync via REST API — works even when git push is network-blocked.
 *
 * Strategy:
 *  1. Get the remote branch's current tree (flat, recursive)
 *  2. Get our local HEAD tree (flat)
 *  3. Upload only blobs that differ (by SHA), skipping large binaries
 *  4. Create a new GitHub tree based on the remote tree + our changes
 *  5. Create a commit on GitHub pointing to that tree
 *  6. Force-update the branch ref
 *
 * Large binary files (videos, fonts > MAX_BLOB_BYTES) are skipped — they
 * can be tracked with Git LFS separately if needed.
 */

import { execSync } from "child_process";
import { existsSync, readFileSync, writeFileSync } from "fs";

const OWNER = "mumudabull";
const REPO = "mumu";
const BRANCH = "main";
const SYNC_STATE_FILE = ".github-sync-sha";
const TOKEN = process.env.GITHUB_TOKEN;
const CONCURRENT_UPLOADS = 8;
const RETRY_LIMIT = 3;
const MAX_BLOB_BYTES = 5 * 1024 * 1024; // skip files > 5MB (GitHub API is slow for large blobs)

if (!TOKEN) {
  console.log("GITHUB_TOKEN not set — skipping GitHub sync");
  process.exit(0);
}

const BASE = `https://api.github.com/repos/${OWNER}/${REPO}`;

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
  let skippedLarge = 0;
  for (const line of localTreeOutput.split("\n").filter(Boolean)) {
    const [meta, path] = line.split("\t");
    const [mode, , objSha, sizeStr] = meta.split(/\s+/);
    const size = parseInt(sizeStr, 10);
    if (size > MAX_BLOB_BYTES) {
      skippedLarge++;
      continue;
    }
    localFiles.set(path, { mode, objSha, size });
  }
  console.log(
    `Local tree:  ${localFiles.size} files (skipped ${skippedLarge} large files > ${MAX_BLOB_BYTES / 1024 / 1024}MB)`
  );

  // Compute diff
  const toUpload = [];
  const toDelete = [];

  for (const [path, { mode, objSha }] of localFiles) {
    const remoteObjSha = remoteFiles.get(path);
    if (remoteObjSha !== objSha) {
      toUpload.push({ path, mode, objSha });
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
    // Upload blobs concurrently
    const blobMap = new Map(); // objSha → githubBlobSha
    let done = 0;

    if (toUpload.length > 0) {
      console.log(`Uploading ${toUpload.length} blobs…`);

      for (let i = 0; i < toUpload.length; i += CONCURRENT_UPLOADS) {
        const batch = toUpload.slice(i, i + CONCURRENT_UPLOADS);
        await Promise.all(
          batch.map(async ({ path, objSha }) => {
            const content = execSync(`git cat-file blob ${objSha}`, {
              encoding: "buffer",
              maxBuffer: MAX_BLOB_BYTES + 1024,
            });
            const blob = await api("/git/blobs", {
              method: "POST",
              body: { content: content.toString("base64"), encoding: "base64" },
            });
            blobMap.set(objSha, blob.sha);
            done++;
            process.stdout.write(`  ${done}/${toUpload.length} blobs\r`);
          })
        );
      }
      console.log(`  ${toUpload.length}/${toUpload.length} blobs uploaded   `);
    }

    // Build tree entries
    const treeEntries = [];
    for (const { path, mode, objSha } of toUpload) {
      treeEntries.push({ path, mode, type: "blob", sha: blobMap.get(objSha) });
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

  // Create commit
  const commitMessage = `${localMsg}\n\nSynced from Replit (${localSha.slice(0, 7)})`;
  const parents = remoteCommitSha ? [remoteCommitSha] : [];
  const newCommit = await api("/git/commits", {
    method: "POST",
    body: { message: commitMessage, tree: newTreeSha, parents },
  });
  console.log(`New commit: ${newCommit.sha.slice(0, 7)}`);

  // Update or create branch ref
  if (remoteCommitSha) {
    await api(`/git/refs/heads/${BRANCH}`, {
      method: "PATCH",
      body: { sha: newCommit.sha, force: true },
    });
  } else {
    await api("/git/refs", {
      method: "POST",
      body: { ref: `refs/heads/${BRANCH}`, sha: newCommit.sha },
    });
  }

  writeFileSync(SYNC_STATE_FILE, localSha);
  console.log(`\nGitHub sync complete — ${OWNER}/${REPO}:${BRANCH} updated`);
}

main().catch((err) => {
  console.error("\nGitHub sync failed:", err.message);
  process.exit(1);
});
