---
title: "SharedStorage: delete() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/sharedstorage/delete/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SharedStorage: delete() method

The **`delete()`** method of the `SharedStorage` interface deletes an existing key-value pair from the current origin's shared storage.

## Syntax

```js
delete(key)
```

### Parameters

- `key`
    A string representing the key of the key-value pair you want to delete.

### Return value

A `Promise` that fulfills with `undefined`.

### Exceptions

- The `Promise` rejects with a `TypeError` if:
  - The database was not cleared successfully due to shared storage not being available (for example it is disabled using a browser setting).
  - `key` exceeds the browser-defined maximum length.
  - The calling site does not have the Shared Storage API included in a successful privacy sandbox enrollment process.
- In the case of `WorkletSharedStorage`, the `Promise` rejects with a `TypeError` if:
  - The worklet module has not been added with `SharedStorageWorklet.addModule()`.

> **Note:**
> If the key-value pair doesn't exist in the shared storage, no error is thrown — the operation still fulfills with `undefined`.

> **Note:**
> In the case of `WindowSharedStorage`, if the `delete()` operation doesn't successfully write to the database for a reason other than shared storage not being available, no error is thrown — the operation still fulfills with `undefined`.

## Examples

```js
window.sharedStorage
  .delete("ab-testing-group")
  .then(() => console.log("Value deleted"));
```

## See also

- Shared Storage API
