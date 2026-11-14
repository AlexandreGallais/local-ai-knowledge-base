---
title: "browser.connectTimeout | Config"
tool: "vitest"
version: "5.1"
source: "https://github.com/vitest-dev/vitest/blob/7a3844954d8753fc0d5bed76a96ffd3a21716c22/docs/config/browser/connecttimeout.md"
commit: "7a3844954d8753fc0d5bed76a96ffd3a21716c22"
license: "MIT"
---

# browser.connectTimeout

- **Type:** `number`
- **Default:** `60_000`

The timeout in milliseconds. If connection to the browser takes longer, the test suite will fail.

**Info:**
This is the time it should take for the browser to establish the WebSocket connection with the Vitest server. In normal circumstances, this timeout should never be reached.
