---
title: "WorkletSharedStorage: length() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/workletsharedstorage/length/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WorkletSharedStorage: length() method

The **`length()`** method of the
`WorkletSharedStorage` interface returns the number of entries currently stored in shared storage for the current origin.

## Syntax

```js
length()
```

### Parameters

None.

### Return value

A `Promise` that fulfills with a number, which represents the total count of key-value pairs currently in the shared storage.

### Exceptions

- `TypeError`
    Thrown if:
    - The worklet module has not yet been added with `addModule()`.
    - The calling site does not have the Shared Storage API included in a successful privacy sandbox enrollment process.
    - The browser fails to retrieve the number of entries for some other reason.

## Examples

```js
// length() available inside a shared storage worklet module

async function retrieveLength() {
  const length = await this.sharedStorage.length();
  console.log(length);
}
```

## See also

- Shared Storage API
