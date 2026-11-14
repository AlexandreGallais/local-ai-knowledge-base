---
title: "onConsoleLog | Config"
tool: "vitest"
version: "5.1"
source: "https://github.com/vitest-dev/vitest/blob/7a3844954d8753fc0d5bed76a96ffd3a21716c22/docs/config/onconsolelog.md"
commit: "7a3844954d8753fc0d5bed76a96ffd3a21716c22"
license: "MIT"
---

# onConsoleLog <CRoot />

```ts
function onConsoleLog(
  log: string,
  type: 'stdout' | 'stderr',
  entity: TestModule | TestSuite | TestCase | undefined,
): boolean | void
```

Custom handler for `console` methods in tests. If you return `false`, Vitest will not print the log to the console. Note that Vitest ignores all other falsy values.

Can be useful for filtering out logs from third-party libraries.

```ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    onConsoleLog(log: string, type: 'stdout' | 'stderr'): boolean | void {
      return !(log === 'message from third party library' && type === 'stdout')
    },
  },
})
```
