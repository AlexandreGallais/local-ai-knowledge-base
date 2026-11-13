---
title: "ImageCapture: getPhotoCapabilities() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/imagecapture/getphotocapabilities/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ImageCapture: getPhotoCapabilities() method

The **`getPhotoCapabilities()`**
method of the `ImageCapture` interface returns a `Promise`
that resolves with an object containing the ranges of
available configuration options.

## Syntax

```js
getPhotoCapabilities()
```

### Parameters

None.

### Return value

A `Promise` that resolves with an object containing the following properties:

- `redEyeReduction`
    Returns one of `"never"`, `"always"`, or `"controllable"`. The `"controllable"` value means the device's red-eye reduction is controllable by the user.
- `imageHeight`
    Returns an object indicating the image height range supported by the user agent.
- `imageWidth`
    Returns an object indicating the image width range supported by the user agent.
- `fillLightMode`
    Returns an array of available fill light options. Options include `auto`, `off`, or `flash`.

### Exceptions

- `InvalidStateError` `DOMException`
    Thrown if `readyState` property of the `MediaStreamTrack` passing in the constructor is not `live`.
- `OperationError` `DOMException`
    Thrown if the operation can't complete for any reason.

## Examples

The following example, extracted from Chrome's Image Capture / Photo Resolution Sample, uses the results from
`getPhotoCapabilities()` to modify the size of an input range. This example
also shows how the `ImageCapture` object is created using a
`MediaStreamTrack` retrieved from a device's `MediaStream`.

```js
const input = document.querySelector('input[type="range"]');

let imageCapture;

navigator.mediaDevices
  .getUserMedia({ video: true })
  .then((mediaStream) => {
    document.querySelector("video").srcObject = mediaStream;

    const track = mediaStream.getVideoTracks()[0];
    imageCapture = new ImageCapture(track);

    return imageCapture.getPhotoCapabilities();
  })
  .then((photoCapabilities) => {
    const settings = imageCapture.track.getSettings();

    input.min = photoCapabilities.imageWidth.min;
    input.max = photoCapabilities.imageWidth.max;
    input.step = photoCapabilities.imageWidth.step;

    return imageCapture.getPhotoSettings();
  })
  .then((photoSettings) => {
    input.value = photoSettings.imageWidth;
  })
  .catch((error) => console.error("Argh!", error.name || error));
```
