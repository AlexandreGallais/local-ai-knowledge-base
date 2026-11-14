---
title: "FileSystemEntry: filesystem property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/filesystementry/filesystem/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# FileSystemEntry: filesystem property

The read-only **`filesystem`**
property of the `FileSystemEntry` interface contains a
`FileSystem` object that represents the file system on which the entry
resides.

## Value

A `FileSystem` representing the file system on which the file or directory
described by the `FileSystemEntry` is located.

## Examples

This example obtains a `FileSystemDirectoryEntry` for the root directory
of the file system containing a file.

```js
let rootDirEntry = fileEntry.filesystem.root;
```

## See also

- File and Directory Entries API
- `FileSystemEntry`
- `FileSystem`
