---
title: "WorkletSharedStorage: keys() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/workletsharedstorage/keys/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WorkletSharedStorage: keys() method

The **`keys()`** method of the
`WorkletSharedStorage` interface returns an async iterator, which contains the keys for each item in a `WorkletSharedStorage` instance.

## Syntax

```js
keys()
```

### Parameters

None.

### Return value

An array of the `WorkletSharedStorage`'s enumerable property keys.

### Exceptions

- `TypeError`
    Thrown if the calling site does not have the Shared Storage API included in a successful privacy sandbox enrollment process.

## Examples

```js
// keys() available inside a shared storage worklet module
const storage = await this.sharedStorage;

async function logKeys() {
  for await (const key of storage.keys()) {
    console.log(key);
  }
}
```

## See also

- Shared Storage API
