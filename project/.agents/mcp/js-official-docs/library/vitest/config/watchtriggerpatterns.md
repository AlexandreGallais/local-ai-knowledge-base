---
title: "watchTriggerPatterns | Config"
tool: "vitest"
version: "5.1"
source: "https://github.com/vitest-dev/vitest/blob/7a3844954d8753fc0d5bed76a96ffd3a21716c22/docs/config/watchtriggerpatterns.md"
commit: "7a3844954d8753fc0d5bed76a96ffd3a21716c22"
license: "MIT"
---

# watchTriggerPatterns <CRoot /> <Version>3.2.0</Version>

- **Type:** `WatcherTriggerPattern[]`

Vitest reruns tests based on the module graph which is populated by static and dynamic `import` statements. However, if you are reading from the file system or fetching from a proxy, then Vitest cannot detect those dependencies.

To correctly rerun those tests, you can define a regex pattern and a function that returns a list of test files to run.

```ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    watchTriggerPatterns: [
      {
        pattern: /src\/(mailers|templates)\/(.*)\.(ts|html|txt)$/,
        testsToRun: (id, match) => {
          // relative to the root value
          return `./api/tests/mailers/${match[2]}.test.ts`
        },
      },
    ],
  },
})
```

**Warning:**
Returned files should be either absolute or relative to the root. Note that this is a global option, and it cannot be used inside of project configs.
