---
title: "FileSystemEntry: remove() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/filesystementry/remove/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# FileSystemEntry: remove() method

The `FileSystemEntry` interface's method
**`remove()`** deletes the file
or directory from the file system. Directories must be empty before they can be
removed.

To recursively remove a directory as well as all of its contents and its
subdirectories, call `FileSystemDirectoryEntry.removeRecursively()`
instead.

## Syntax

```js
remove(successCallback)
remove(successCallback, errorCallback)
```

### Parameters

- `successCallback`
    A function which is called once the file has been successfully removed.
- `errorCallback` (optional)
    An optional callback which is called if the attempt to remove the file fails.

### Return value

None (`undefined`).

### Exceptions

- `DOMException.INVALID_MODIFICATION_ERR`
    The specified entry was the file system's root directory, or the specified entry is
    a directory which isn't empty.
- `DOMException.INVALID_STATE_ERR`
    The file system's cached state is inconsistent with its state on disk, so the file
    could not be deleted for safety reasons.
- `DOMException.NO_MODIFICATION_ALLOWED_ERR`
    The file system's state doesn't permit removing the file or directory.
- `DOMException.NOT_FOUND_ERR`
    The file or directory doesn't exist.
- `DOMException.SECURITY_ERR`
    The entry couldn't be removed due to permissions or other access constraints, or
    because there are too many calls being made on file resources.

## Examples

This example deletes a temporary work file.

```js
workingDirectory.getFile(
  "tmp/work-file.json",
  {},
  (fileEntry) => {
    fileEntry.remove(() => {
      /* the file was removed successfully */
    });
  },
  handleError,
);
```

## See also

- File and Directory Entries API
- `FileSystemDirectoryEntry.removeRecursively()`
