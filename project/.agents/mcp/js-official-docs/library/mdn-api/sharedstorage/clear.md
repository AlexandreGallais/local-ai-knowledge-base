---
title: "SharedStorage: clear() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/sharedstorage/clear/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SharedStorage: clear() method

The **`clear()`** method of the `SharedStorage` interface clears the current origin's shared storage, removing all data from it.

## Syntax

```js
clear()
```

### Parameters

None.

### Return value

A `Promise` that fulfills with `undefined`.

### Exceptions

- The `Promise` rejects with a `TypeError` if:
  - The database was not cleared successfully due to shared storage not being available (for example it is disabled using a browser setting).
  - The calling site does not have the Shared Storage API included in a successful privacy sandbox enrollment process.
- In the case of `WorkletSharedStorage`, the `Promise` rejects with a `TypeError` if the worklet module has not been added with `SharedStorageWorklet.addModule()`.

> **Note:**
> In the case of `WindowSharedStorage`, if the `clear()` operation doesn't successfully write to the database for a reason other than shared storage not being available, no error is thrown — the operation still fulfills with `undefined`.

## Examples

```js
window.sharedStorage.clear().then(() => console.log("Shared storage cleared"));
```

## See also

- Shared Storage API
