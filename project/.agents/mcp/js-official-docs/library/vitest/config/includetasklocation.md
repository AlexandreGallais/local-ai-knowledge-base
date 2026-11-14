---
title: "includeTaskLocation | Config"
tool: "vitest"
version: "5.1"
source: "https://github.com/vitest-dev/vitest/blob/7a3844954d8753fc0d5bed76a96ffd3a21716c22/docs/config/includetasklocation.md"
commit: "7a3844954d8753fc0d5bed76a96ffd3a21716c22"
license: "MIT"
---

# includeTaskLocation

- **Type:** `boolean`
- **Default:** `false`

Should `location` property be included when Vitest API receives tasks in reporters. If you have a lot of tests, this might cause a small performance regression.

The `location` property has `column` and `line` values that correspond to the `test` or `describe` position in the original file.

This option will be auto-enabled if you don't disable it explicitly, and you are running Vitest with:

- Vitest UI
- or using the Browser Mode without headless mode
- or using HTML Reporter

**Tip:**
This option has no effect if you do not use custom code that relies on this.
