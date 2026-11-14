---
title: "browser.enabled | Config"
tool: "vitest"
version: "5.1"
source: "https://github.com/vitest-dev/vitest/blob/7a3844954d8753fc0d5bed76a96ffd3a21716c22/docs/config/browser/enabled.md"
commit: "7a3844954d8753fc0d5bed76a96ffd3a21716c22"
license: "MIT"
---

# browser.enabled

- **Type:** `boolean`
- **Default:** `false`
- **CLI:** `--browser`, `--browser.enabled=false`

Enabling this flag makes Vitest run all tests in a browser by default. If you are configuring other browser options via the CLI, you can use `--browser.enabled` alongside them instead of `--browser`:

```sh
vitest --browser.enabled --browser.headless
```

**Warning:**
To enable Browser Mode, you must also specify the `provider` and at least one `instance`. Available providers:

- playwright
- webdriverio
- preview

## Example

```js
import { defineConfig } from 'vitest/config'
import { playwright } from '@vitest/browser-playwright'

export default defineConfig({
  test: {
    browser: {
      enabled: true,
      provider: playwright(),
      instances: [
        { browser: 'chromium' },
      ],
    },
  },
})
```

If you use TypeScript, the `browser` field in `instances` provides autocompletion based on your provider.
