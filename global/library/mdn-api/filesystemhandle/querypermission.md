---
title: "FileSystemHandle: queryPermission() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/filesystemhandle/querypermission/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# FileSystemHandle: queryPermission() method

The **`queryPermission()`** method of the
`FileSystemHandle` interface queries the current permission state of the
current handle.

## Syntax

```js
queryPermission(descriptor)
```

### Parameters

- `descriptor` (optional)
    An object which specifies the permission mode to query for. Options are as follows:
    - `'mode'` (optional)
        Can be either `'read'`, `'write'`, or `'readwrite'`.

### Return value

A `Promise` that resolves with `PermissionStatus.state` which is one of `'granted'`, `'denied'` or `'prompt'`. It may also reject with one of the exceptions below.

If this resolves with "prompt", the website will have to call `requestPermission()` before any
operations on the handle can be done. If this resolves with "denied" any operations will
reject. Usually handles returned by the local file system handle factories will
initially resolves with "granted" for their read permission state. However, other than through
the user revoking permission, a handle retrieved from IndexedDB is also likely to resolves with
"prompt".

### Exceptions

- `TypeError`
    Thrown if `mode` is specified with a value other than
    `'read'`, `'write'`, or `'readwrite'`

## Examples

The following asynchronous function returns true if user has granted read or readwrite
permissions to the file handle. Permission is requested if not.

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
