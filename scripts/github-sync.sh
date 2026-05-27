#!/bin/bash
set -e

if [ -z "$GITHUB_TOKEN" ]; then
  echo "GITHUB_TOKEN is not set — skipping GitHub sync"
  exit 0
fi

REPO_URL="https://${GITHUB_TOKEN}@github.com/mumudabull/mumu.git"

git config user.email "replit-bot@users.noreply.github.com"
git config user.name "Replit Bot"

CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)

git push "$REPO_URL" "${CURRENT_BRANCH}:main" --force-with-lease 2>&1 | grep -v "https://"

echo "GitHub sync complete — pushed ${CURRENT_BRANCH} to origin/main"
