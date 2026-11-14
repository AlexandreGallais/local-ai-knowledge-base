---
title: "browser.trackUnhandledErrors | Config"
tool: "vitest"
version: "5.1"
source: "https://github.com/vitest-dev/vitest/blob/7a3844954d8753fc0d5bed76a96ffd3a21716c22/docs/config/browser/trackunhandlederrors.md"
commit: "7a3844954d8753fc0d5bed76a96ffd3a21716c22"
license: "MIT"
---

# browser.trackUnhandledErrors

- **Type:** `boolean`
- **Default:** `true`

Enables tracking uncaught errors and exceptions so they can be reported by Vitest.

If you need to hide certain errors, it is recommended to use `onUnhandledError` option instead.

Disabling this will completely remove all Vitest error handlers, which can help debugging with the "Pause on exceptions" checkbox turned on.
