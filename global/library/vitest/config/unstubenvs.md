---
title: "unstubEnvs | Config"
tool: "vitest"
version: "5.1"
source: "https://github.com/vitest-dev/vitest/blob/7a3844954d8753fc0d5bed76a96ffd3a21716c22/docs/config/unstubenvs.md"
commit: "7a3844954d8753fc0d5bed76a96ffd3a21716c22"
license: "MIT"
---

# unstubEnvs

- **Type:** `boolean`
- **Default:** `false`

Should Vitest automatically call `vi.unstubAllEnvs()` before each test.

```js
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    unstubEnvs: true,
  },
})
```

**Warning:**
Be aware that this option may cause problems with async concurrent tests. If enabled, the completion of one test will restore all the values changed with `vi.stubEnv`, including those currently being used by other tests in progress.
