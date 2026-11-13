---
title: "dangerouslyIgnoreUnhandledErrors | Config"
tool: "vitest"
version: "5.1"
source: "https://github.com/vitest-dev/vitest/blob/7a3844954d8753fc0d5bed76a96ffd3a21716c22/docs/config/dangerouslyignoreunhandlederrors.md"
commit: "7a3844954d8753fc0d5bed76a96ffd3a21716c22"
license: "MIT"
---

# dangerouslyIgnoreUnhandledErrors <CRoot />

- **Type:** `boolean`
- **Default:** `false`
- **CLI:**
  - `--dangerouslyIgnoreUnhandledErrors`
  - `--dangerouslyIgnoreUnhandledErrors=false`

If this option is set to `true`, Vitest will not fail the test run if there are unhandled errors. Note that built-in reporters will still report them.

If you want to filter out certain errors conditionally, use `onUnhandledError` callback instead.

## Example

```js
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    dangerouslyIgnoreUnhandledErrors: true,
  },
})
```
