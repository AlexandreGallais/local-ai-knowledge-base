---
title: "SharedStorage: set() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/sharedstorage/set/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SharedStorage: set() method

The **`set()`** method of the `SharedStorage` interface either stores a new key-value pair in the current origin's shared storage or updates an existing one.

## Syntax

```js
set(key, value)
set(key, value, options)
```

### Parameters

- `key`
    A string representing the key in the key-value pair that you want to add or update.
- `value`
    A string representing the value you want to add or update.
- `options` (optional)
    An options object containing the following properties:
    - `ignoreIfPresent`
        A boolean value. The value `true` causes the set operation to abort if a key-value pair with the specified `key` already exists. The default value `false` causes the set operation to overwrite the previous value.

### Return value

A `Promise` that fulfills with `undefined`.

### Exceptions

- The `Promise` rejects with a `TypeError` if:
  - The created entry was not successfully stored in the database due to shared storage not being available (for example it is disabled using a browser setting).
  - `key` and/or `value` exceed the browser-defined maximum length.
  - The calling site does not have the Shared Storage API included in a successful privacy sandbox enrollment process.
- In the case of `WorkletSharedStorage`, the `Promise` rejects with a `TypeError` if the worklet module has not been added with `SharedStorageWorklet.addModule()`.

> **Note:**
> In the case of `WindowSharedStorage`, if the `set()` operation doesn't successfully write to the database for a reason other than shared storage not being available, no error is thrown — the operation still fulfills with `undefined`.

## Examples

```js
window.sharedStorage
  .set("ab-testing-group", "0", {
    ignoreIfPresent: true,
  })
  .then(() => console.log("Set operation completed"));
```

## See also

- Shared Storage API
