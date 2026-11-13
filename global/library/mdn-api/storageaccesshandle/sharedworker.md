---
title: "StorageAccessHandle: SharedWorker() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/storageaccesshandle/sharedworker/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# StorageAccessHandle: SharedWorker() method

> **Note:**
> See `SharedWorker()` to understand usage.

## Syntax

```js
SharedWorker(url)
SharedWorker(url, name)
SharedWorker(url, options)
```

### Parameters

- `url`
    See `SharedWorker()`.
- `name` (optional)
    See `SharedWorker()`.
- `options` (optional)
    See `SharedWorker()`.

> **Note:**
> `options.sameSiteCookies` only supports the value "none", which is the default.

### Return value

An unpartitioned `SharedWorker` object.

### Exceptions

- `SecurityError` `DomException`
    Thrown if access was not granted.

See `SharedWorker()`

## Examples

```js
document.requestStorageAccess({ SharedWorker: true }).then(
  (handle) => {
    console.log("SharedWorker access granted");
    handle.SharedWorker(shared_worker_url);
  },
  () => {
    console.log("SharedWorker access denied");
  },
);
```

> **Note:**
> See Using the Storage Access API for a more complete example.

## See also

- `Document.requestStorageAccess()`
- Using the Storage Access API
