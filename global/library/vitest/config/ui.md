---
title: "ui | Config"
tool: "vitest"
version: "5.1"
source: "https://github.com/vitest-dev/vitest/blob/7a3844954d8753fc0d5bed76a96ffd3a21716c22/docs/config/ui.md"
commit: "7a3844954d8753fc0d5bed76a96ffd3a21716c22"
license: "MIT"
---

# ui <CRoot />

- **Type:** `boolean | object`
- **Default:** `false`
- **CLI:** `--ui`, `--ui=false`

Enable Vitest UI. Setting `ui: true` is the same as `ui: { enabled: true }`.

**Warning:**
This features requires a `@vitest/ui` package to be installed. If you do not have it already, Vitest will install it when you run the test command for the first time.

**SECURITY ADVICE**
Make sure that your UI server is not exposed to the network. Since Vitest 4.1 setting `api.host` to anything other than `localhost` will disable the buttons to save the code or run any tests for security reasons, effectively making UI a readonly reporter.

## ui.enabled <Version type="experimental">5.0.4</Version> {#ui-enabled}

- **Type:** `boolean`
- **Default:** `false`

Enable Vitest UI.

## ui.theme <Version type="experimental">5.0.4</Version> {#ui-theme}

- **Type:** `'auto' | 'light' | 'dark'`
- **Default:** `'auto'`

The color theme of Vitest UI and of the Browser Mode UI. With `'auto'`, the UI follows the system preference and remembers the theme you toggle in the UI. With `'light'` or `'dark'`, the UI opens with this theme on every page load, and the toggle changes it only until the page reloads.

This option does not enable Vitest UI, so you can set it together with `browser.ui`:

```ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    ui: {
      theme: 'dark',
    },
    browser: {
      enabled: true,
      instances: [
        { browser: 'chromium' },
      ],
    }
  },
})
```
