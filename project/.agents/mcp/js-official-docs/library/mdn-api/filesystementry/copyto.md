---
title: "FileSystemEntry: copyTo() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/filesystementry/copyto/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# FileSystemEntry: copyTo() method

The `FileSystemEntry` interface's method
**`copyTo()`** copies the file
specified by the entry to a new location on the file system.

There are some
typical restrictions on what you can do:

- A directory can't be copied into itself.
- An entry can't be copied into its parent directory unless you specify a new name.
- When copying a directory, the copy is always recursive; you can't leave out
  subfolders.

## Syntax

```js
copyTo(newParent)
copyTo(newParent, newName)
copyTo(newParent, newName, successCallback)
copyTo(newParent, newName, successCallback, errorCallback)
```

### Parameters

- `newParent`
    A `FileSystemDirectoryEntry` object specifying the destination
    directory for the copy operation.
- `newName` (optional)
    If this parameter is provided, the copy is given this string as its new file or
    directory name.
- `successCallback` (optional)
    A function which is called when the copy operation is successfully completed.
    Receives a single input parameter: a `FileSystemEntry` based object
    providing the copied item's new details.
- `errorCallback` (optional)
    An optional callback which is executed if an error occurs while copying the items.
    There's a single parameter: a `DOMException` describing what went wrong.

### Return value

None (`undefined`).

### Exceptions

- `DOMException.INVALID_MODIFICATION_ERR`
    The requested operation involves an impossible change, such as moving a directory
    inside itself or one of its own child directories, or copying an item within the same
    directory without renaming it.
- `DOMException.QUOTA_EXCEEDED_ERR`
    The operation exceeded the user's storage quota, or there isn't enough storage space
    left to complete the operation.

## Examples

This example shows how a temporary log file might be moved into a more permanent "log"
directory.

```js
workingDirectory.getFile(
  "tmp/log.txt",
  {},
  (fileEntry) => {
    workingDirectory.getDirectory(
      "log",
      {},
      (dirEntry) => {
        fileEntry.copyTo(dirEntry);
      },
      handleError,
    );
  },
  handleError,
);
```

## See also

- File and Directory Entries API
