---
title: "EncodedAudioChunk: byteLength property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/encodedaudiochunk/bytelength/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# EncodedAudioChunk: byteLength property

The **`byteLength`** read-only property of the `EncodedAudioChunk` interface returns the length in bytes of the encoded audio data.

## Value

An integer.

## Examples

In the following example the `byteLength` is printed to the console.

```js
const init = {
  type: "key",
  data: audioBuffer,
  timestamp: 23000000,
  duration: 2000000,
};
const chunk = new EncodedAudioChunk(init);

console.log(chunk.byteLength); // 352800
```
