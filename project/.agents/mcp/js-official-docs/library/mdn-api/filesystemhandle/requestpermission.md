---
title: "FileSystemHandle: requestPermission() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/filesystemhandle/requestpermission/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# FileSystemHandle: requestPermission() method

The **`requestPermission()`** method of the
`FileSystemHandle` interface requests read or readwrite permissions for the
file handle.

## Syntax

```js
requestPermission(descriptor)
```

### Parameters

- `descriptor` (optional)
    An object which specifies the permission mode to query for. Options are as follows:
    - `'mode'` (optional)
        Can be either `'read'`, `'write'`, or `'readwrite'`.

### Return value

A `Promise` that resolves with `PermissionStatus.state` which is one of `'granted'`, `'denied'` or `'prompt'`. It may also reject with one of the exceptions below.

### Exceptions

- `TypeError`
    Thrown if no parameter is specified or the `mode` is not that of
    `'read'`, `'write'`, or `'readwrite'`
- `SecurityError` `DOMException`
    Thrown in one of the following cases:
    - The method was called in a context that's not same-origin as the top-level context (i.e., a cross-origin iframe).
    - There was no transient user activation such as a button press. This includes when the handle is in a non-Window context which cannot consume user activation, such as a worker.

## Security

Transient user activation is required. The user has to interact with the page or a UI element in order for this feature to work.

## Examples

The following asynchronous function requests permissions if they have not been granted.

```js
// fileHandle is a FileSystemFileHandle
// withWrite is a boolean set to true if write

async function verifyPermission(fileHandle, withWrite) {
  const opts = {};
  if (withWrite) {
    opts.mode = "readwrite";
  }

  // Check if we already have permission, if so, return true.
  if ((await fileHandle.queryPermission(opts)) === "granted") {
    return true;
  }

  // Request permission to the file, if the user grants permission, return true.
  if ((await fileHandle.requestPermission(opts)) === "granted") {
    return true;
  }

  // The user did not grant permission, return false.
  return false;
}
```

## See also

- File System API
- The File System Access API: simplifying access to local files
