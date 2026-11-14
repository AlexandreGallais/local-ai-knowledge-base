---
title: "FileSystemEntry: isDirectory property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/filesystementry/isdirectory/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# FileSystemEntry: isDirectory property

The read-only **`isDirectory`**
property of the `FileSystemEntry` interface is `true` if the
entry represents a directory (meaning it's a `FileSystemDirectoryEntry`)
and `false` if it's not.

You can also use `isFile` to determine if the
entry is a file.

> **Warning:**
> You should not assume that any entry which isn't a directory is a file or vice versa.
> There are other types of file descriptors on many operating systems. Be sure to use
> both `isDirectory` and `isFile` as needed to ensure that the
> entry is something you know how to work with.

## Value

A Boolean indicating whether or not the `FileSystemEntry` is a directory.

## Examples

This example shows how this property might be used to determine whether to process the
entry as a directory or file. If the entry is neither, an error handler is called with
an appropriate message.

```js
if (entry.isDirectory) {
  processSubdirectory(entry);
} else if (entry.isFile) {
  processFile(entry);
} else {
  displayErrorMessage("Unsupported file system entry specified.");
}
```

## See also

- File and Directory Entries API
- `FileSystemEntry`
- `FileSystemEntry.isFile`
- `FileSystemDirectoryEntry`
