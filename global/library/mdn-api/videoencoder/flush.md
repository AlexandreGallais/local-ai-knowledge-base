---
title: "VideoEncoder: flush() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/videoencoder/flush/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# VideoEncoder: flush() method

The **`flush()`** method of the `VideoEncoder` interface forces all pending encodes to complete.

## Syntax

```js
flush()
```

### Parameters

None.

### Return value

A `Promise` that resolves once the encoder's initialization is completed and all pending `EncodedVideoChunk`s are returned.

### Exceptions

- `InvalidStateError` `DOMException`
    Returned if the Promise is rejected because the `state` is not `configured`.

## Examples

The following example flushes the `VideoEncoder`.

```js
VideoEncoder.flush();
```
