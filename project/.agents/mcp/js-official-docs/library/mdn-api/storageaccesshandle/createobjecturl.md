---
title: "StorageAccessHandle: createObjectURL() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/storageaccesshandle/createobjecturl/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# StorageAccessHandle: createObjectURL() method

> **Note:**
> See `createObjectURL()` to understand usage.

## Syntax

```js
createObjectURL(object)
```

### Parameters

- `object`
    See `createObjectURL()`.

### Return value

A string containing an unpartitioned object URL that can be used to reference the contents of the specified source `object`.

### Exceptions

- `SecurityError` `DomException`
    Thrown if access was not granted.

See `createObjectURL()`

## Examples

```js
document.requestStorageAccess({ createObjectURL: true }).then(
  (handle) => {
    console.log("createObjectURL access granted");
    handle.createObjectURL(new Blob(["foo"]));
  },
  () => {
    console.log("createObjectURL access denied");
  },
);
```

> **Note:**
> See Using the Storage Access API for a more complete example.

## See also

- `Document.requestStorageAccess()`
- Using the Storage Access API
