#!/usr/bin/env node
/**
 * Print recent GitHub sync history from .github-sync-log.jsonl.
 *
 * Usage: node scripts/github-sync-status.mjs [N]
 *   N — number of most recent entries to show (default 10).
 */

import { existsSync, readFileSync } from "fs";

const LOG_FILE = ".github-sync-log.jsonl";
const SHA_FILE = ".github-sync-sha";
const N = parseInt(process.argv[2], 10) || 10;

if (!existsSync(LOG_FILE)) {
  console.log(`No sync log found at ${LOG_FILE}.`);
  console.log("The log is created on the next post-merge GitHub sync run.");
  process.exit(0);
}

const lines = readFileSync(LOG_FILE, "utf8")
  .split("\n")
  .filter(Boolean);

const entries = [];
for (const line of lines) {
  try {
    entries.push(JSON.parse(line));
  } catch {
    // ignore malformed lines
  }
}

if (entries.length === 0) {
  console.log("Sync log is empty.");
  process.exit(0);
}

const lastSha = existsSync(SHA_FILE) ? readFileSync(SHA_FILE, "utf8").trim() : null;

const recent = entries.slice(-N).reverse();

console.log(`GitHub sync history — last ${recent.length} of ${entries.length} entries`);
if (lastSha) console.log(`Last synced SHA on disk: ${lastSha.slice(0, 7)}`);
console.log("");

const ICON = { success: "✓", skipped: "·", error: "✗" };

for (const e of recent) {
  const icon = ICON[e.status] ?? "?";
  const when = e.timestamp ?? "?";
  const sha = (e.localSha ?? "").slice(0, 7) || "-------";
  const dur = e.durationMs != null ? `${(e.durationMs / 1000).toFixed(1)}s` : "?";
  const msg = (e.localMsg ?? "").slice(0, 60);
  console.log(`${icon} ${when}  ${sha}  ${dur.padStart(7)}  ${msg}`);

  if (e.status === "success") {
    const before = (e.remoteShaBefore ?? "").slice(0, 7) || "(new)";
    const after = (e.remoteShaAfter ?? "").slice(0, 7) || "?";
    console.log(
      `    pushed ${before} → ${after}  ` +
        `uploaded=${e.uploaded ?? 0} (lfs=${e.lfsUploaded ?? 0}) deleted=${e.deleted ?? 0}`
    );
  } else if (e.status === "skipped") {
    console.log(`    skipped: ${e.reason ?? "unknown"}`);
  } else if (e.status === "error") {
    console.log(`    error: ${e.error ?? "unknown"}`);
  }
}
