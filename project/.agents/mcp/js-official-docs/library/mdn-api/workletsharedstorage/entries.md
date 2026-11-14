---
title: "WorkletSharedStorage: entries() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/workletsharedstorage/entries/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WorkletSharedStorage: entries() method

The **`entries()`** method of the
`WorkletSharedStorage` interface returns an async iterator. The iterator provides an array of `[key, value]` pairs corresponding to the enumerable properties of a `WorkletSharedStorage` instance. The order of these pairs is similar to that in a `for...in` loop, though a `for...in` loop also enumerates properties from the prototype chain.

## Syntax

```js
entries()
```

### Parameters

None.

### Return value

An array of the `WorkletSharedStorage`'s enumerable property key-value pairs.

### Exceptions

- `TypeError`
    Thrown if the calling site does not have the Shared Storage API included in a successful privacy sandbox enrollment process.

## Examples

```js
// entries() available inside a shared storage worklet module
const storage = await this.sharedStorage;

async function logEntries() {
  for await (const [key, value] of storage.entries()) {
    console.log({ key, value });
  }
}
```

## See also

- Shared Storage API
