---
title: "StorageAccessHandle: getDirectory() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/storageaccesshandle/getdirectory/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# StorageAccessHandle: getDirectory() method

> **Note:**
> See `StorageManager.getDirectory()` to understand usage.

## Syntax

```js
getDirectory()
```

### Parameters

None.

### Return value

A `Promise` that fulfills with an unpartitioned `FileSystemDirectoryHandle` object.

### Exceptions

- `SecurityError` `DomException`
    Thrown if access was not granted.

See `StorageManager.getDirectory()`

## Examples

```js
document.requestStorageAccess({ getDirectory: true }).then(
  async (handle) => {
    console.log("getDirectory access granted");
    await handle.getDirectory();
  },
  () => {
    console.log("getDirectory access denied");
  },
);
```

> **Note:**
> See Using the Storage Access API for a more complete example.

## See also

- `Document.requestStorageAccess()`
- Using the Storage Access API
