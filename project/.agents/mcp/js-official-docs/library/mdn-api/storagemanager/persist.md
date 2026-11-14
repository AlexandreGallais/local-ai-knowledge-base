---
title: "StorageManager: persist() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/storagemanager/persist/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# StorageManager: persist() method

The **`persist()`** method of the `StorageManager` interface requests permission to use persistent storage, and returns a `Promise` that resolves to `true` if permission is granted and bucket mode is persistent, and `false` otherwise. The browser may or may not honor the request, depending on browser-specific rules. (For more details, see the guide to Storage quotas and eviction criteria.)

> **Note:**
> This method is not available in Web Workers, though the `StorageManager` interface is.

## Syntax

```js
persist()
```

### Parameters

None.

### Return value

A `Promise` that resolves to a `Boolean`.

### Exceptions

- `TypeError`
    Thrown if obtaining a local storage shelf failed. For example, if the current origin is an opaque origin or if the user has disabled storage.

## Example

```js
if (navigator.storage && navigator.storage.persist) {
  navigator.storage.persist().then((persistent) => {
    if (persistent) {
      console.log("Storage will not be cleared except by explicit user action");
    } else {
      console.log("Storage may be cleared by the UA under storage pressure.");
    }
  });
}
```
