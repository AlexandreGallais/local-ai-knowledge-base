---
title: "EncodedVideoChunk: EncodedVideoChunk() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/encodedvideochunk/encodedvideochunk/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# EncodedVideoChunk: EncodedVideoChunk() constructor

The **`EncodedVideoChunk()`** constructor creates a new `EncodedVideoChunk` object representing a chunk of encoded video.

## Syntax

```js
new EncodedVideoChunk(options)
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
        An integer representing the timestamp of the video in microseconds.
    - `duration`
        An integer representing the length of the video in microseconds.
    - `data`
        An `ArrayBuffer`, a `TypedArray`, or a `DataView` containing the video data.
    - `transfer`
        An array of `ArrayBuffer`s that `EncodedVideoChunk` will detach and take ownership of. If the array contains the `ArrayBuffer` backing `data`, `EncodedVideoChunk` will use that buffer directly instead of copying from it.

## Examples

In the following example a new `EncodedVideoChunk` is created.

```js
const init = {
  type: "key",
  data: videoBuffer,
  timestamp: 23000000,
  duration: 2000000,
  transfer: [videoBuffer],
};
chunk = new EncodedVideoChunk(init);
```
