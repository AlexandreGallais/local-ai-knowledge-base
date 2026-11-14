---
title: "disableConsoleIntercept | Config"
tool: "vitest"
version: "5.1"
source: "https://github.com/vitest-dev/vitest/blob/7a3844954d8753fc0d5bed76a96ffd3a21716c22/docs/config/disableconsoleintercept.md"
commit: "7a3844954d8753fc0d5bed76a96ffd3a21716c22"
license: "MIT"
---

# disableConsoleIntercept

- **Type:** `boolean`
- **CLI:** `--disableConsoleIntercept`
- **Default:** `false`

By default, Vitest intercepts console output during tests to add context such as the test file and test title.

In browser mode, this interception is required to forward logs from the browser DevTools to the terminal. It is also required for console log previews in the Vitest UI.

Disabling console interception can be useful when you want to debug code with normal synchronous terminal logging.
