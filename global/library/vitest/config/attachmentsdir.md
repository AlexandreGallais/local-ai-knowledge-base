---
title: "attachmentsDir | Config"
tool: "vitest"
version: "5.1"
source: "https://github.com/vitest-dev/vitest/blob/7a3844954d8753fc0d5bed76a96ffd3a21716c22/docs/config/attachmentsdir.md"
commit: "7a3844954d8753fc0d5bed76a96ffd3a21716c22"
license: "MIT"
---

# attachmentsDir <CRoot />

- **Type:** `string`
- **Default:** `'.vitest/attachments'`

Directory path for storing file attachments created by `context.annotate`.

This option is resolved relative to the root Vitest config. When using `projects`, all projects share the same `attachmentsDir`; it cannot be configured per project.
