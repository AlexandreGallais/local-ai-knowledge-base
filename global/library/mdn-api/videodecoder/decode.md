---
title: "VideoDecoder: decode() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/videodecoder/decode/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# VideoDecoder: decode() method

The **`decode()`** method of the `VideoDecoder` interface enqueues a control message to decode a given chunk of video.

## Syntax

```js
decode(chunk)
```

### Parameters

- `chunk`
    An `EncodedVideoChunk` object representing a chunk of encoded video.

### Return value

None (`undefined`).

### Exceptions

- `InvalidStateError` `DOMException`
    Thrown if the `state` is not `configured`.
- `DataError` `DOMException`
    Thrown if the `chunk` is unable to be decoded due to relying on other frames for decoding.

## Examples

The following example demonstrates how to use the `decode()` method to decode `EncodedVideoChunk` objects created from encoded video data.

```js
const responses = await downloadVideoChunksFromServer(timestamp);
for (const response of responses) {
  const chunk = new EncodedVideoChunk({
    timestamp: response.timestamp,
    type: response.key ? "key" : "delta",
    data: new Uint8Array(response.body),
  });
  decoder.decode(chunk);
}
```
