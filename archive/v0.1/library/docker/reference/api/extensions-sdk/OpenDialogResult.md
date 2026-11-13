---
title: "Interface: OpenDialogResult"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/reference/api/extensions-sdk/OpenDialogResult.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Interface: OpenDialogResult

**`Since`**

0.2.3

## Properties

### canceled

• `Readonly` **canceled**: `boolean`

Whether the dialog was canceled.

___

### filePaths

• `Readonly` **filePaths**: `string`[]

An array of file paths chosen by the user. If the dialog is cancelled this will be an empty array.

___

### bookmarks

• `Optional` `Readonly` **bookmarks**: `string`[]

macOS only. An array matching the `filePaths` array of `base64` encoded strings which contains security scoped bookmark data. `securityScopedBookmarks` must be enabled for this to be populated.
