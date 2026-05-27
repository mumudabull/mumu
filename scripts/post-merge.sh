#!/bin/bash
set -e
pnpm install --frozen-lockfile
pnpm --filter db push

node scripts/github-sync.mjs
node scripts/github-sync-status.mjs 5 || true
