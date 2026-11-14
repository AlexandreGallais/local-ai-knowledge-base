---
title: "StorageAccessHandle: estimate() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/storageaccesshandle/estimate/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# StorageAccessHandle: estimate() method

> **Note:**
> See `StorageManager.estimate()` to understand usage.

## Syntax

```js
estimate()
```

### Parameters

None.

### Return value

A `Promise` that fulfills with an unpartitioned `StorageEstimate` object.

### Exceptions

- `SecurityError` `DomException`
    Thrown if access was not granted.

See `StorageManager.estimate()`

## Examples

```js
document.requestStorageAccess({ estimate: true }).then(
  async (handle) => {
    console.log("estimate access granted");
    await handle.estimate();
  },
  () => {
    console.log("estimate access denied");
  },
);
```

> **Note:**
> See Using the Storage Access API for a more complete example.

## See also

- `Document.requestStorageAccess()`
- Using the Storage Access API
