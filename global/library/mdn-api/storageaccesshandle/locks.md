---
title: "StorageAccessHandle: locks property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/storageaccesshandle/locks/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# StorageAccessHandle: locks property

The **`locks`** property of the `StorageAccessHandle` interface returns an unpartitioned session `LockManager` object if access was granted, and throws a `SecurityError` `DOMException` otherwise.

## Value

A `LockManager` object.

## Examples

```js
document.requestStorageAccess({ locks: true }).then(
  (handle) => {
    console.log("locks access granted");
    handle.locks.request("foo", (lock) => "ok");
  },
  () => {
    console.log("locks access denied");
  },
);
```

> **Note:**
> See Using the Storage Access API for a more complete example.

## See also

- `Document.requestStorageAccess()`
- Using the Storage Access API
