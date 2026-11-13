---
title: "StorageAccessHandle: sessionStorage property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/storageaccesshandle/sessionstorage/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# StorageAccessHandle: sessionStorage property

The **`sessionStorage`** property of the `StorageAccessHandle` interface returns an unpartitioned session `Storage` object if access was granted, and throws a `SecurityError` `DOMException` otherwise.

## Value

A `Storage` object.

## Examples

```js
document.requestStorageAccess({ sessionStorage: true }).then(
  (handle) => {
    console.log("sessionStorage access granted");
    handle.sessionStorage.setItem("foo", "bar");
  },
  () => {
    console.log("sessionStorage access denied");
  },
);
```

> **Note:**
> See Using the Storage Access API for a more complete example.

## See also

- `Document.requestStorageAccess()`
- Using the Storage Access API
