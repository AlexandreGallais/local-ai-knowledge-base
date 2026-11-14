---
title: "allowOnly | Config"
tool: "vitest"
version: "5.1"
source: "https://github.com/vitest-dev/vitest/blob/7a3844954d8753fc0d5bed76a96ffd3a21716c22/docs/config/allowonly.md"
commit: "7a3844954d8753fc0d5bed76a96ffd3a21716c22"
license: "MIT"
---

# allowOnly

- **Type:** `boolean`
- **Default:** `!process.env.CI`
- **CLI:** `--allowOnly`, `--allowOnly=false`

By default, Vitest does not permit tests marked with the `only` flag in Continuous Integration (CI) environments. Conversely, in local development environments, Vitest allows these tests to run.

**Info:**
Vitest uses `std-env` package to detect the environment.

You can customize this behavior by explicitly setting the `allowOnly` option to either `true` or `false`.

::: code-group

```js
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    allowOnly: true,
  },
})
```

```bash
vitest --allowOnly
```

When enabled, Vitest will not fail the test suite if tests marked with `only` are detected, including in CI environments.

When disabled, Vitest will fail the test suite if tests marked with `only` are detected, including in local development environments.
