---
title: "EncodedAudioChunk: type property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/encodedaudiochunk/type/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# EncodedAudioChunk: type property

The **`type`** read-only property of the `EncodedAudioChunk` interface returns a value indicating whether the audio chunk is a key chunk, which does not relying on other frames for decoding.

## Value

A string, one of:

- `"key"`
    The data is a key chunk.
- `"delta"`
    The data is not a key chunk.

## Examples

In the following example the `type` is printed to the console.

```js
const init = {
  type: "key",
  data: audioBuffer,
  timestamp: 23000000,
  duration: 2000000,
};
const chunk = new EncodedAudioChunk(init);

console.log(chunk.type); // "key"
```
