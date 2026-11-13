---
title: "SharedStorage"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/sharedstorage/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SharedStorage

The **`SharedStorage`** interface of the `Shared Storage API` represents the shared storage for a particular origin, defining methods to write data to the shared storage.

`SharedStorage` is the base class for:

- `WindowSharedStorage`, accessed via `Window.sharedStorage`.
- `WorkletSharedStorage`, accessed via `SharedStorageWorkletGlobalScope.sharedStorage`.

## Instance methods

- `append()` (deprecated) (non-standard)
    Appends a string to the value of an existing key-value pair in the current origin's shared storage.
- `clear()` (deprecated) (non-standard)
    Clears the current origin's shared storage, removing all data from it.
- `delete()` (deprecated) (non-standard)
    Deletes an existing key-value pair from the current origin's shared storage.
- `set()` (deprecated) (non-standard)
    Stores a new key-value pair in the current origin's shared storage or updates an existing one.

## Examples

```js
window.sharedStorage
  .set("ab-testing-group", "0")
  .then(() => console.log("Value saved to shared storage"));
```

## See also

- `WindowSharedStorage`
- Shared Storage API
