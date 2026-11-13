---
title: "StorageManager: persisted() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/storagemanager/persisted/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# StorageManager: persisted() method

The **`persisted()`** method of the `StorageManager` interface returns a `Promise` that resolves to `true` if your site's storage bucket is persistent.

## Syntax

```js
persisted()
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
  navigator.storage.persisted().then((persistent) => {
    if (persistent) {
      console.log("Storage will not be cleared except by explicit user action");
    } else {
      console.log("Storage may be cleared by the UA under storage pressure.");
    }
  });
}
```
