---
title: "mockReset | Config"
tool: "vitest"
version: "5.1"
source: "https://github.com/vitest-dev/vitest/blob/7a3844954d8753fc0d5bed76a96ffd3a21716c22/docs/config/mockreset.md"
commit: "7a3844954d8753fc0d5bed76a96ffd3a21716c22"
license: "MIT"
---

# mockReset

- **Type:** `boolean`
- **Default:** `false`

Should Vitest automatically call `vi.resetAllMocks()` before each test.

This will clear mock history and reset each implementation.

```js
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    mockReset: true,
  },
})
```

**Warning:**
Be aware that this option may cause problems with async concurrent tests. If enabled, the completion of one test will clear the mock history and implementation for all mocks, including those currently being used by other tests in progress.
