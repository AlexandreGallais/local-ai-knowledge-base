---
title: "EncodedAudioChunk: copyTo() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/encodedaudiochunk/copyto/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# EncodedAudioChunk: copyTo() method

The **`copyTo()`** method of the `EncodedAudioChunk` interface copies the encoded chunk of audio data.

## Syntax

```js
copyTo(destination)
```

### Parameters

- `destination`
    An `ArrayBuffer`, a `TypedArray`, or a `DataView` that the data can be copied to.

### Return value

None (`undefined`).

## Examples

In the following example an `EncodedAudioChunk` is created then copied.

```js
const init = {
  type: "key",
  data: audioBuffer,
  timestamp: 23000000,
  duration: 2000000,
};
const chunk = new EncodedAudioChunk(init);

chunk.copyTo(newBuffer);
```
