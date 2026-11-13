---
title: "hookTimeout | Config"
tool: "vitest"
version: "5.1"
source: "https://github.com/vitest-dev/vitest/blob/7a3844954d8753fc0d5bed76a96ffd3a21716c22/docs/config/hooktimeout.md"
commit: "7a3844954d8753fc0d5bed76a96ffd3a21716c22"
license: "MIT"
---

# hookTimeout

- **Type:** `number`
- **Default:** `10_000` in Node.js, `30_000` if `browser.enabled` is `true`
- **CLI:** `--hook-timeout=10000`, `--hookTimeout=10000`

Default timeout of a hook in milliseconds. Use `0` to disable timeout completely.
