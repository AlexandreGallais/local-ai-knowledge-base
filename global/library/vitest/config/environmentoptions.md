---
title: "environmentOptions | Config"
tool: "vitest"
version: "5.1"
source: "https://github.com/vitest-dev/vitest/blob/7a3844954d8753fc0d5bed76a96ffd3a21716c22/docs/config/environmentoptions.md"
commit: "7a3844954d8753fc0d5bed76a96ffd3a21716c22"
license: "MIT"
---

# environmentOptions

- **Type:** `Record<'jsdom' | 'happyDOM' | string, unknown>`
- **Default:** `{}`

These options are passed to the setup method of the current environment. By default, you can configure options only for `jsdom` and `happyDOM` when you use them as your test environment.

## Example

```js
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environmentOptions: {
      jsdom: {
        url: 'http://localhost:3000',
      },
      happyDOM: {
        width: 300,
        height: 400,
      },
    },
  },
})
```

**Warning:**
Options are scoped to their environment. For example, put jsdom options under the `jsdom` key and happy-dom options under the `happyDOM` key. This lets you mix multiple environments within the same project.
