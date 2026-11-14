---
title: "Blob: bytes() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/blob/bytes/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Blob: bytes() method

The **`bytes()`** method of the `Blob` interface returns a `Promise` that resolves with a `Uint8Array` containing the contents of the blob as an array of bytes.

## Syntax

```js
bytes()
```

### Parameters

None.

### Return value

A `Promise` that fulfills with a `Uint8Array` object containing the blob data.

### Exceptions

The method will reject the returned `Promise` if, for example, the reader used to fetch the blob's data throws an exception.
