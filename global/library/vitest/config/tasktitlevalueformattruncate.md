---
title: "taskTitleValueFormatTruncate | Config"
tool: "vitest"
version: "5.1"
source: "https://github.com/vitest-dev/vitest/blob/7a3844954d8753fc0d5bed76a96ffd3a21716c22/docs/config/tasktitlevalueformattruncate.md"
commit: "7a3844954d8753fc0d5bed76a96ffd3a21716c22"
license: "MIT"
---

# taskTitleValueFormatTruncate <CRoot /> {#tasktitlevalueformattruncate}

- **Type** `number`
- **Default:** `40`

Sets the length limit for formatted values interpolated into generated task titles.

This affects values inserted by APIs like `test.each` and `test.for`, including both `$value` and `%` placeholder formatting.

Set it to `0` to disable truncation.
