---
title: "FileSystemDirectoryEntry: removeRecursively() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/filesystemdirectoryentry/removerecursively/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# FileSystemDirectoryEntry: removeRecursively() method

The `FileSystemDirectoryEntry` interface's method
**`removeRecursively()`** removes
the directory as well as all of its content, hierarchically iterating over its entire
subtree of descendant files and directories.

To remove a single file, or an empty directory, you can also use
`FileSystemEntry.remove()`.

## Syntax

```js
removeRecursively(successCallback)
removeRecursively(successCallback, errorCallback)
```

### Parameters

- `successCallback`
    A function to call once the directory removal process has completed. The callback
    has no parameters.
- `errorCallback` (optional)
    A function to be called if an error occurs while attempting to remove the directory
    subtree. Receives a `DOMException` describing the error which occurred as
    input.

### Return value

None (`undefined`).

### Exceptions

If an error occurs and an `errorCallback` was specified, it gets called with
a single parameter: a `DOMException` object describing the error. The
`DOMException.code` specifies what type of error occurred, as follows:

- `DOMException.INVALID_MODIFICATION_ERR`
    An attempt was made to remove the root directory; this is not permitted.
- `DOMException.NO_MODIFICATION_ALLOWED_ERR`
    The file system's state doesn't permit modification.
- `DOMException.NOT_FOUND_ERR`
    The directory represented by the `FileSystemDirectoryEntry` no longer
    exists.
- `DOMException.NOT_READABLE_ERR`
    The directory is not accessible; perhaps it's in use by another application or is
    locked at the operating system level.
- `DOMException.SECURITY_ERR`
    The directory could not be removed for security reasons. Possible reasons include:
    - The directory and/or its contents may not be safe to access from a Web
      application.
    - Too many file system calls are being made.
    - Other security concerns as raised by the user agent or the operating system.

> **Note:**
> If you try to delete a directory which contains one or more files that can't be
> removed, or if an error occurs while deletion of a number of files is underway, some
> files may not be deleted. You should provide an `errorCallback` to watch
> for and handle this, perhaps by trying again.

## Examples

```js
directory.removeRecursively(
  () => {
    /* The directory was removed successfully */
  },
  () => {
    /* an error occurred while removing the directory */
  },
);
```

## See also

- File and Directory Entries API
- `FileSystemDirectoryEntry`
- `FileSystemEntry.remove()`
