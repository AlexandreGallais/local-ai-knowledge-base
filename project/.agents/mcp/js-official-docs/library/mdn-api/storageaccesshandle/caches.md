---
title: "StorageAccessHandle: caches property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/storageaccesshandle/caches/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# StorageAccessHandle: caches property

The **`caches`** property of the `StorageAccessHandle` interface returns an unpartitioned `CacheStorage` object if access was granted, and throws a `SecurityError` `DOMException` otherwise.

## Value

A `CacheStorage` object.

## Examples

```js
document.requestStorageAccess({ caches: true }).then(
  async (handle) => {
    console.log("caches access granted");
    const cache = await handle.caches.open("foo");
    await cache.add("/");
  },
  () => {
    console.log("caches access denied");
  },
);
```

> **Note:**
> See Using the Storage Access API for a more complete example.

## See also

- `Document.requestStorageAccess()`
- Using the Storage Access API
