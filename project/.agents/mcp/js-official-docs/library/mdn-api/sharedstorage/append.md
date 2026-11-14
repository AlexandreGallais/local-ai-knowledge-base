---
title: "SharedStorage: append() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/sharedstorage/append/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SharedStorage: append() method

The **`append()`** method of the `SharedStorage` interface appends a string to the value of an existing key-value pair in the current origin's shared storage.

## Syntax

```js
append(key, value)
```

### Parameters

- `key`
    A string representing the key of the key-value pair to which you want to append a value.
- `value`
    A string that you want to append to the existing value of the key-value pair.

> **Note:**
> If the specified `key` isn't found in the shared storage, the `append()` operation is equivalent to `set()`, that is, a new key-value pair with the specified `key` is added to the shared storage.

### Return value

A `Promise` that fulfills with `undefined`.

### Exceptions

- The `Promise` rejects with a `TypeError` if:
  - The appended entry was not successfully stored in the database due to shared storage not being available (for example it is disabled using a browser setting).
  - `key` and/or `value` exceed the browser-defined maximum length.
  - The calling site does not have the Shared Storage API included in a successful privacy sandbox enrollment process.
- In the case of `WorkletSharedStorage`, the `Promise` rejects with a `TypeError` if the worklet module has not been added with `SharedStorageWorklet.addModule()`.

> **Note:**
> In the case of `WindowSharedStorage`, if the `append()` operation doesn't successfully write to the database for a reason other than shared storage not being available, no error is thrown — the operation still fulfills with `undefined`.

## Examples

```js
window.sharedStorage
  .append("integer-list", ",9")
  .then(() => console.log("Value appended to integer list"));
```

## See also

- Shared Storage API
