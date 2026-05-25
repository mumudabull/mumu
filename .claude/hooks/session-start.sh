#!/bin/bash
set -euo pipefail

if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

echo '{"async": true, "asyncTimeout": 120000}'

# Install project dependencies
cd "$CLAUDE_PROJECT_DIR"
npm install

# Install PM skills for all supported agents
npx --yes ai-agent-skills install alirezarezvani/claude-skills/project-management
