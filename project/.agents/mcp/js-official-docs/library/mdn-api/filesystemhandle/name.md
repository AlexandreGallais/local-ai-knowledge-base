---
title: "FileSystemHandle: name property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/filesystemhandle/name/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# FileSystemHandle: name property

The **`name`** read-only property of the
`FileSystemHandle` interface returns the name of the entry represented by
handle.

## Value

A string.

## Examples

The following function allows the user to choose a file from the file picker and
retrieve the `name` property.

```js
// store a reference to our file handle
let fileHandle;

async function getFile() {
  // open file picker
  [fileHandle] = await window.showOpenFilePicker();

  const fileName = fileHandle.name;
}
```

## See also

- File System API
- The File System Access API: simplifying access to local files
