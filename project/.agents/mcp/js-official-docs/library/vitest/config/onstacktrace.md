---
title: "onStackTrace | Config"
tool: "vitest"
version: "5.1"
source: "https://github.com/vitest-dev/vitest/blob/7a3844954d8753fc0d5bed76a96ffd3a21716c22/docs/config/onstacktrace.md"
commit: "7a3844954d8753fc0d5bed76a96ffd3a21716c22"
license: "MIT"
---

# onStackTrace <CRoot />

- **Type:** `(error: Error, frame: ParsedStack) => boolean | void`

Apply a filtering function to each frame of each stack trace when handling errors. This does not apply to stack traces printed by `printConsoleTrace`. The first argument, `error`, is a `TestError`.

Can be useful for filtering out stack trace frames from third-party libraries.

**Tip:**
The stack trace's total size is also typically limited by V8's `Error.stackTraceLimit` number. You could set this to a high value in your test setup function to prevent stacks from being truncated.

```ts
import type { ParsedStack, TestError } from 'vitest'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    onStackTrace(error: TestError, { file }: ParsedStack): boolean | void {
      // If we've encountered a ReferenceError, show the whole stack.
      if (error.name === 'ReferenceError') {
        return
      }

      // Reject all frames from third party libraries.
      if (file.includes('node_modules')) {
        return false
      }
    },
  },
})
```
