---
title: "ImageCapture: ImageCapture() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/imagecapture/imagecapture/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ImageCapture: ImageCapture() constructor

The **`ImageCapture()`** constructor
creates a new `ImageCapture` object.

## Syntax

```js
new ImageCapture(videoTrack)
```

### Parameters

- `videoTrack`
    A `MediaStreamTrack` from which the still images will be taken. This
    can be any source, such as an incoming stream of a video conference, a playing movie,
    or the stream from a webcam.

### Return value

A new `ImageCapture` object which can be used to capture still frames from
the specified video track.

### Exceptions

- `NotSupportedError` `DOMException`
    Thrown if the `videoTrack` parameter's `kind` property is not `video`.

## Examples

The following example shows how to use a call to
`MediaDevices.getUserMedia()` to retrieve the
`MediaStreamTrack` needed by the `ImageCapture()` constructor.

```js
navigator.mediaDevices
  .getUserMedia({ video: true })
  .then((mediaStream) => {
    document.querySelector("video").srcObject = mediaStream;
    const track = mediaStream.getVideoTracks()[0];
    imageCapture = new ImageCapture(track);
  })
  .catch((error) => console.error(error));
```
