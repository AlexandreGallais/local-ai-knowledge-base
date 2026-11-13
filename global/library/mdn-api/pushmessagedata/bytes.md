---
title: "PushMessageData: bytes() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/pushmessagedata/bytes/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PushMessageData: bytes() method

The **`bytes()`** method of the `PushMessageData` interface extracts push message data as a `Uint8Array` object.

## Syntax

```js
bytes()
```

### Parameters

None.

### Return value

A `Uint8Array`.

### Exceptions

The returned `Uint8Array` is backed by an `ArrayBuffer` of bytes.
Exceptions thrown during creation of this backing buffer are re-thrown.

See `TypedArray`.

## Examples

```js
self.addEventListener("push", (event) => {
  const buffer = event.data.bytes();

  // do something with your typed array
});
```
