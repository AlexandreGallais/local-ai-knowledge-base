---
title: "EncodedAudioChunk: EncodedAudioChunk() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/encodedaudiochunk/encodedaudiochunk/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# EncodedAudioChunk: EncodedAudioChunk() constructor

The **`EncodedAudioChunk()`** constructor creates a new `EncodedAudioChunk` object representing a chunk of encoded audio.

## Syntax

```js
new EncodedAudioChunk(options)
```

### Parameters

- `options`
    An object containing the following members:
    - `type`
        Indicates if the chunk is a key chunk that does not rely on other frames for encoding. One of:
        - `"key"`
            The data is a key chunk.
        - `"delta"`
            The data is not a key chunk.
    - `timestamp`
        An integer representing the timestamp of the audio in microseconds.
    - `duration`
        An integer representing the length of the audio in microseconds.
    - `data`
        An `ArrayBuffer`, a `TypedArray`, or a `DataView` containing the audio data.
    - `transfer`
        An array of `ArrayBuffer`s that `EncodedAudioChunk` will detach and take ownership of. If the array contains the `ArrayBuffer` backing `data`, `EncodedAudioChunk` will use that buffer directly instead of copying from it.

## Examples

In the following example a new `EncodedAudioChunk` is created.

```js
const init = {
  type: "key",
  data: audioBuffer,
  timestamp: 23000000,
  duration: 2000000,
  transfer: [audioBuffer],
};
chunk = new EncodedAudioChunk(init);
```
