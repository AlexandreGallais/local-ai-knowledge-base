---
title: "browser.ui | Config"
tool: "vitest"
version: "5.1"
source: "https://github.com/vitest-dev/vitest/blob/7a3844954d8753fc0d5bed76a96ffd3a21716c22/docs/config/browser/ui.md"
commit: "7a3844954d8753fc0d5bed76a96ffd3a21716c22"
license: "MIT"
---

# browser.ui

- **Type:** `boolean`
- **Default:** `!browser.headless && !isCI`
- **CLI:** `--browser.ui=false`

Should the browser UI be injected into the page. By default, injects UI iframe during development. See Headless Mode and UI for how this option relates to `browser.headless` and the top-level `--ui` flag.
