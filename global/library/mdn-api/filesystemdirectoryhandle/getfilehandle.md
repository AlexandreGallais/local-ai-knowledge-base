---
title: "FileSystemDirectoryHandle: getFileHandle() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/filesystemdirectoryhandle/getfilehandle/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# FileSystemDirectoryHandle: getFileHandle() method

The **`getFileHandle()`** method of the
`FileSystemDirectoryHandle` interface returns a
`FileSystemFileHandle` for a file with the specified name, within the
directory the method is called.

## Syntax

```js
getFileHandle(name)
getFileHandle(name, options)
```

### Parameters

- `name`
    A string representing the `FileSystemHandle.name` of
    the file you wish to retrieve.
- `options` (optional)
    An object with the following properties:
    - `create` (optional)
        A `Boolean`. Default `false`. When
        set to `true` if the file is not found, one with the specified name
        will be created and returned.

### Return value

A `Promise` which resolves with a `FileSystemFileHandle`.

### Exceptions

- `NotAllowedError` `DOMException`
    Thrown if the `PermissionStatus.state` for the handle is not `'granted'` in `readwrite` mode if the `create` option is set to `true` or in `read` mode if the `create` option is set to `false`.
- `TypeError`
    Thrown if the name specified is not a valid string or contains characters that would
    interfere with the native file system.
- `TypeMismatchError` `DOMException`
    Thrown if the named entry is a directory and not a file.
- `NotFoundError` `DOMException`
    Thrown if the current entry is not found or if the file doesn't exist and the `create` option is set to
    `false`.

## Examples

The following example returns a file handle with the specified name, if the file does
not exist it is created.

```js
const fileName = "fileToGetName";

// assuming we have a directory handle: 'currentDirHandle'
const fileHandle = await currentDirHandle.getFileHandle(fileName, {
  create: true,
});
```

## See also

- File System API
- The File System Access API: simplifying access to local files
