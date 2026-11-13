---
title: "restoreMocks | Config"
tool: "vitest"
version: "5.1"
source: "https://github.com/vitest-dev/vitest/blob/7a3844954d8753fc0d5bed76a96ffd3a21716c22/docs/config/restoremocks.md"
commit: "7a3844954d8753fc0d5bed76a96ffd3a21716c22"
license: "MIT"
---

# restoreMocks

- **Type:** `boolean`
- **Default:** `false`

Should Vitest automatically call `vi.restoreAllMocks()` before each test.

This restores all original implementations on spies created manually with `vi.spyOn`.

```js
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    restoreMocks: true,
  },
})
```

**Warning:**
Be aware that this option may cause problems with async concurrent tests. If enabled, the completion of one test will restore the implementation for all spies, including those currently being used by other tests in progress.
