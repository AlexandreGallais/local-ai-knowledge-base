---
title: "AudioDecoder: decode() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/audiodecoder/decode/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AudioDecoder: decode() method

The **`decode()`** method of the `AudioDecoder` interface enqueues a control message to decode a given chunk of audio.

## Syntax

```js
decode(chunk)
```

### Parameters

- `chunk`
    An `EncodedAudioChunk` object representing a chunk of encoded audio.

### Return value

None (`undefined`).

### Exceptions

- `InvalidStateError` `DOMException`
    Thrown if the `state` is not `"configured"`.
- `DataError` `DOMException`
    Thrown if the `chunk` is unable to be decoded due to relying on other frames for decoding.
