---
title: "StorageAccessHandle: indexedDB property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/storageaccesshandle/indexeddb/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# StorageAccessHandle: indexedDB property

The **`indexedDB`** property of the `StorageAccessHandle` interface returns an unpartitioned `IDBFactory` object if access was granted, and throws a `SecurityError` `DOMException` otherwise.

## Value

An `IDBFactory` object.

## Examples

```js
document.requestStorageAccess({ indexedDB: true }).then(
  async (handle) => {
    console.log("indexedDB access granted");
    await handle.indexedDB.deleteDatabase("foo");
  },
  () => {
    console.log("indexedDB access denied");
  },
);
```

> **Note:**
> See Using the Storage Access API for a more complete example.

## See also

- `Document.requestStorageAccess()`
- Using the Storage Access API
