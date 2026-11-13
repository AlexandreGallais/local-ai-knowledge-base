---
title: "testTimeout | Config"
tool: "vitest"
version: "5.1"
source: "https://github.com/vitest-dev/vitest/blob/7a3844954d8753fc0d5bed76a96ffd3a21716c22/docs/config/testtimeout.md"
commit: "7a3844954d8753fc0d5bed76a96ffd3a21716c22"
license: "MIT"
---

# testTimeout

- **Type:** `number`
- **Default:** `5_000` in Node.js, `15_000` if `browser.enabled` is `true`
- **CLI:** `--test-timeout=5000`, `--testTimeout=5000`

Default timeout of a test in milliseconds. Use `0` to disable timeout completely.
