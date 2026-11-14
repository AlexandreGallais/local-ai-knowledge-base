---
title: "FileSystemHandle: kind property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/filesystemhandle/kind/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# FileSystemHandle: kind property

The **`kind`** read-only property of the
`FileSystemHandle` interface returns the type of entry. This is
`'file'` if the associated entry is a file or `'directory'`. It is
used to distinguish files from directories when iterating over the contents of a
directory.

## Value

A string that can be:

- `'file'`: If the handle is a `FileSystemFileHandle`.
- `'directory'`: If the handle is a `FileSystemDirectoryHandle`.

## Examples

The following function allows the user to choose a file from the file picker and then
tests to see whether the handle returned is a file or directory

```js
// store a reference to our file handle
let fileHandle;

async function getFile() {
  // open file picker
  [fileHandle] = await window.showOpenFilePicker();

  if (fileHandle.kind === "file") {
    // run file code
  } else if (fileHandle.kind === "directory") {
    // run directory code
  }
}
```

## See also

- File System API
- The File System Access API: simplifying access to local files
