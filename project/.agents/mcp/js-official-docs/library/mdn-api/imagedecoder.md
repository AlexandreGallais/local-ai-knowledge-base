---
title: "ImageDecoder"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/imagedecoder/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ImageDecoder

The **`ImageDecoder`** interface of the `WebCodecs API` provides a way to unpack and decode encoded image data.

## Constructor

- `ImageDecoder()`
    Creates a new `ImageDecoder` object.

## Instance properties

- `ImageDecoder.complete` (read-only)
    Returns a boolean value indicating whether encoded data is completely buffered.
- `ImageDecoder.completed` (read-only)
    Returns a `Promise` that resolves once `complete` is true.
- `ImageDecoder.tracks` (read-only)
    Returns an `ImageTrackList` object listing the available tracks and providing a method for selecting a track to decode.
- `ImageDecoder.type` (read-only)
    Returns a string reflecting the MIME type configured during construction.

## Static methods

- `ImageDecoder.isTypeSupported()`
    Indicates if the provided MIME type is supported for unpacking and decoding.

## Instance methods

- `ImageDecoder.close()`
    Ends all pending work and releases system resources.
- `ImageDecoder.decode()`
    Enqueues a control message to decode the frame of an image.
- `ImageDecoder.reset()`
    Aborts all pending `decode()` operations.

## Examples

Given a `<canvas>` element:

```html
<canvas></canvas>
```

the following code decodes and renders an animated image to that canvas:

```js
let imageDecoder = null;
let imageIndex = 0;

function renderImage(result) {
  const canvas = document.querySelector("canvas");
  const canvasContext = canvas.getContext("2d");

  canvasContext.drawImage(result.image, 0, 0);

  const track = imageDecoder.tracks.selectedTrack;

  // We check complete here since `frameCount` won't be stable until all
  // data has been received. This may cause us to receive a RangeError
  // during the decode() call below which needs to be handled.
  if (imageDecoder.complete) {
    if (track.frameCount === 1) return;

    if (imageIndex + 1 >= track.frameCount) imageIndex = 0;
  }

  // Decode the next frame ahead of display so it's ready in time.
  imageDecoder
    .decode({ frameIndex: ++imageIndex })
    .then((nextResult) =>
      setTimeout(() => {
        renderImage(nextResult);
      }, result.image.duration / 1000.0),
    )
    .catch((e) => {
      // We can end up requesting an imageIndex past the end since
      // we're using a ReadableStream from fetch(), when this happens
      // just wrap around.
      if (e instanceof RangeError) {
        imageIndex = 0;
        imageDecoder.decode({ frameIndex: imageIndex }).then(renderImage);
      } else {
        throw e;
      }
    });
}

function decodeImage(imageByteStream) {
  imageDecoder = new ImageDecoder({ data: imageByteStream, type: "image/gif" });
  imageDecoder.decode({ frameIndex: imageIndex }).then(renderImage);
}

fetch("fancy.gif").then((response) => decodeImage(response.body));
```
