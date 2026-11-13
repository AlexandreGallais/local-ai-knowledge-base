---
title: "StorageAccessHandle"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/storageaccesshandle/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# StorageAccessHandle

The **`StorageAccessHandle`** interface represents access to unpartitioned state granted by a call to `Document.requestStorageAccess()`.

## Instance properties

- `StorageAccessHandle.sessionStorage` (read-only)
    Returns an unpartitioned session `Storage` object if access was granted.
- `StorageAccessHandle.localStorage` (read-only)
    Returns an unpartitioned local `Storage` object if access was granted.
- `StorageAccessHandle.indexedDB` (read-only)
    Returns an unpartitioned `IDBFactory` object if access was granted.
- `StorageAccessHandle.locks` (read-only)
    Returns an unpartitioned `LockManager` object if access was granted.
- `StorageAccessHandle.caches` (read-only)
    Returns an unpartitioned `CacheStorage` object if access was granted.

## Instance methods

- `StorageAccessHandle.getDirectory()`
    Returns a `Promise` that fulfills with an unpartitioned `FileSystemDirectoryHandle` object if access was granted, and rejects otherwise.
- `StorageAccessHandle.estimate()`
    Returns a `Promise` that fulfills with an unpartitioned `StorageEstimate` object if access was granted, and rejects otherwise.
- `StorageAccessHandle.createObjectURL()`
    Returns a string representing the unpartitioned blob storage url created if access was granted, and throws otherwise.
- `StorageAccessHandle.revokeObjectURL()`
    Revokes the unpartitioned blob storage url passed in if access was granted, and throws otherwise.
- `StorageAccessHandle.BroadcastChannel()`
    Returns the unpartitioned `BroadcastChannel` created if access was granted, and throws otherwise.
- `StorageAccessHandle.SharedWorker()`
    Returns the unpartitioned `SharedWorker` created if access was granted, and throws otherwise.

## Example

```js
document.requestStorageAccess({ localStorage: true }).then(
  (handle) => {
    console.log("localStorage access granted");
    handle.localStorage.setItem("foo", "bar");
  },
  () => {
    console.log("localStorage access denied");
  },
);
```

> **Note:**
> See Using the Storage Access API for a more complete example.

## See also

- `Document.requestStorageAccess()`
- Using the Storage Access API
