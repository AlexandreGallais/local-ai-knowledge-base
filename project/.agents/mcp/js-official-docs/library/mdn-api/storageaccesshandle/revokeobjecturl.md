---
title: "StorageAccessHandle: revokeObjectURL() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/storageaccesshandle/revokeobjecturl/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# StorageAccessHandle: revokeObjectURL() method

> **Note:**
> See `revokeObjectURL()` to understand usage.

## Syntax

```js
revokeObjectURL(objectURL)
```

### Parameters

- `objectURL`
    See `revokeObjectURL()`.

### Return value

None (`undefined`).

### Exceptions

- `SecurityError` `DomException`
    Thrown if access was not granted.

See `revokeObjectURL()`

## Examples

```js
document.requestStorageAccess({ revokeObjectURL: true }).then(
  (handle) => {
    console.log("revokeObjectURL access granted");
    handle.revokeObjectURL(blob_url);
  },
  () => {
    console.log("revokeObjectURL access denied");
  },
);
```

> **Note:**
> See Using the Storage Access API for a more complete example.

## See also

- `Document.requestStorageAccess()`
- Using the Storage Access API
