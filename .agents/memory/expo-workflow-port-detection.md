---
name: Expo workflow port detection failure
description: restart_workflow always fails with DIDNT_OPEN_A_PORT for Expo artifacts in this environment — root cause and accepted workaround.
---

## The Rule
`restart_workflow` for Expo artifact workflows (`router = "expo-domain"`) consistently fails with `DIDNT_OPEN_A_PORT`, even when Metro IS running and serving (confirmed by logs and manual curl). Do not attempt to fix this with code changes — it is a platform-level network namespace isolation issue.

**Why:** The workflow port-detection check runs in a separate network namespace from the workflow process. Ports opened by the Node.js/Metro process are visible in the container's `/proc/net/tcp6` (dual-stack `[::]:PORT`) but the detection system cannot see them from its namespace. Tried: different ports (21569, 8082, 8000), different routers (expo-domain, path), Node.js proxy on 0.0.0.0, UV_PREFER_IP4, NODE_OPTIONS dns-result-order — none worked.

**How to apply:** When building Expo mobile apps, accept that `restart_workflow` will fail for the artifact workflow. Call `presentArtifact` directly after writing all files — the app is accessible to the user via the Expo Go QR code even without `restart_workflow` succeeding. Note this limitation in the commit message and to the user.
