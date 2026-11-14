---
title: "ImageDecoder: decode() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/imagedecoder/decode/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ImageDecoder: decode() method

The **`decode()`** method of the `ImageDecoder` interface enqueues a control message to decode the frame of an image.

## Syntax

```js
decode()
decode(options)
```

### Parameters

- `options` (optional)
    An object containing the following members:
    - `frameIndex` (optional)
        An integer representing the index of the frame to decode. Defaults to `0` (the first frame).
    - `completeFramesOnly` (optional)
        A `Boolean` defaulting to `true`.
        When `true`, the `Promise` returned by the method resolves only when the image is fully decoded.
        When `false`, the method will return a new `Promise` that may resolve with a partially decoded image.
        The method can be called repeatedly until `result.complete` is true, with each step providing an image with the next available level of detail.

### Return value

A `Promise` that resolves with an object containing the following members:

- `image`
    A `VideoFrame` containing the decoded image.
- `complete`
    A `Boolean`, if `true` indicates that `image` contains the final full-detail output.

### Exceptions

If an error occurs, the promise will resolve with following exception:

- `InvalidStateError` `DOMException`
    Returned if any of the following conditions apply:
    - `close` is true, meaning `close()` has already been called.
    - The requested frame does not exist.

## Examples

### Synchronous decoding of a completed image frame

The following example decodes the second frame (at index `1`) and prints the resulting `VideoFrame` to the console.

```js
let result = await imageDecoder.decode({ frameIndex: 1 });
console.log(result.image);
```

### Partial decoding of a progressive image frame

The following example decodes the first frame repeatedly until it's complete:

```js
let complete = false;
while (!complete) {
  // The promise returned by `decode()` will only resolve when a new
  // level of detail is available or the frame is complete. I.e.,
  // calling `decode()` in a loop like this won't needlessly spin.
  let result = await imageDecoder.decode({ completeFramesOnly: false });

  // Do something with `result.image`.

  complete = result.complete;
}
```
