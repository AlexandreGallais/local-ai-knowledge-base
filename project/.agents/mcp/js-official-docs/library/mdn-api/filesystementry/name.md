---
title: "FileSystemEntry: name property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/filesystementry/name/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# FileSystemEntry: name property

The read-only **`name`** property of
the `FileSystemEntry` interface returns a string
specifying the entry's name; this is the entry within its parent directory (the last
component of the path as indicated by the `fullPath` property).

## Value

A string indicating the entry's name.

## Examples

This example shows a function called `isFileWithExtension()` which returns
true if the specified `FileSystemEntry` is both a file and the file's name
ends with a given extension.

```js
function isFileWithExtension(entry, extension) {
  return entry.isFile && entry.name.endsWith(`.${extension}`);
}
```

## See also

- File and Directory Entries API
- `FileSystemEntry`
- `FileSystemEntry.fullPath`
