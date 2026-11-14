---
title: "FileSystemDirectoryHandle: getDirectoryHandle() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/filesystemdirectoryhandle/getdirectoryhandle/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# FileSystemDirectoryHandle: getDirectoryHandle() method

The **`getDirectoryHandle()`** method of the
`FileSystemDirectoryHandle` interface returns a
`FileSystemDirectoryHandle` for a subdirectory with the specified name
within the directory handle on which the method is called.

## Syntax

```js
getDirectoryHandle(name)
getDirectoryHandle(name, options)
```

### Parameters

- `name`
    A string representing the `FileSystemHandle.name` of
    the subdirectory you wish to retrieve.
- `options` (optional)
    An optional object containing options for the retrieved subdirectory. Options are as
    follows:
    - `create` (optional)
        A boolean value, which defaults to `false`. When
        set to `true` if the directory is not found, one with the specified
        name will be created and returned.

### Return value

A `Promise` which resolves with a `FileSystemDirectoryHandle`.

### Exceptions

- `NotAllowedError` `DOMException`
    Thrown if the `PermissionStatus.state` for the handle is not `'granted'` in `readwrite` mode if the `create` option is set to `true` or in `read` mode if the `create` option is set to `false`.
- `TypeError`
    Thrown if the name specified is not a valid string or contains characters that would
    interfere with the native file system.
- `TypeMismatchError` `DOMException`
    Thrown if the returned entry is a file and not a directory.
- `NotFoundError` `DOMException`
    Thrown if the current entry is not found or if the target directory doesn't exist and the `create` option is set to
    `false`.

## Examples

The following example returns a directory handle with the specified name, if the
directory does not exist it is created.

```js
const dirName = "directoryToGetName";

// assuming we have a directory handle: 'currentDirHandle'
const subDir = await currentDirHandle.getDirectoryHandle(dirName, {
  create: true,
});
```

## See also

- File System API
- The File System Access API: simplifying access to local files
