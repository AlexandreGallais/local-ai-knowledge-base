---
title: "clearMocks | Config"
tool: "vitest"
version: "5.1"
source: "https://github.com/vitest-dev/vitest/blob/7a3844954d8753fc0d5bed76a96ffd3a21716c22/docs/config/clearmocks.md"
commit: "7a3844954d8753fc0d5bed76a96ffd3a21716c22"
license: "MIT"
---

# clearMocks

- **Type:** `boolean`
- **Default:** `true`

Should Vitest automatically call `vi.clearAllMocks()` before each test.

This will clear mock history without affecting mock implementations.

```js
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    clearMocks: false,
  },
})
```

**Warning:**
Be aware that this option may cause problems with async concurrent tests. If enabled, the completion of one test will clear the mock history for all mocks, including those currently being used by other tests in progress.
