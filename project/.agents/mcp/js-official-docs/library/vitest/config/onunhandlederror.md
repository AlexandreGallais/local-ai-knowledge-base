---
title: "onUnhandledError | Config"
tool: "vitest"
version: "5.1"
source: "https://github.com/vitest-dev/vitest/blob/7a3844954d8753fc0d5bed76a96ffd3a21716c22/docs/config/onunhandlederror.md"
commit: "7a3844954d8753fc0d5bed76a96ffd3a21716c22"
license: "MIT"
---

# onUnhandledError <CRoot /> <Version>4.0.0</Version>

- **Type:**

```ts
function onUnhandledError(
  error: (TestError | Error) & { type: string }
): boolean | void
```

A custom callback for filtering unhandled errors that should not be reported. When an error is filtered out, it no longer affects the result of the test run.

To report unhandled errors without affecting the test outcome, use the `dangerouslyIgnoreUnhandledErrors` option instead.

**Tip:**
This callback is called on the main thread, it doesn't have access to your test context.

## Example

```ts
import type { ParsedStack } from 'vitest'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    onUnhandledError(error): boolean | void {
      // Ignore all errors with the name "MySpecialError".
      if (error.name === 'MySpecialError') {
        return false
      }
    },
  },
})
```
