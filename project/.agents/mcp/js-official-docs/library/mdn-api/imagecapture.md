---
title: "ImageCapture"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/imagecapture/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ImageCapture

The **`ImageCapture`** interface of the MediaStream Image Capture API provides methods to enable the capture of images or photos from a camera or other photographic device. It provides an interface for capturing images from a photographic device referenced through a valid `MediaStreamTrack`.

## Constructor

- `ImageCapture()`
    Creates a new `ImageCapture` object which can be used to capture still frames (photos) from a given `MediaStreamTrack` which represents a video stream.

## Instance properties

- `ImageCapture.track` (read-only)
    Returns a reference to the `MediaStreamTrack` passed to the constructor.

## Instance methods

- `ImageCapture.takePhoto()`
    Takes a single exposure using the video capture device sourcing a `MediaStreamTrack` and returns a `Promise` that resolves with a `Blob` containing the data.
- `ImageCapture.getPhotoCapabilities()`
    Returns a `Promise` that resolves with an object containing the ranges of available configuration options.
- `ImageCapture.getPhotoSettings()`
    Returns a `Promise` that resolves with an object containing the current photo configuration settings.
- `ImageCapture.grabFrame()`
    Takes a snapshot of the live video in a `MediaStreamTrack`, returning an `ImageBitmap`, if successful.

## Example

The following code is taken from Chrome's Grab Frame - Take Photo Sample. Since `ImageCapture` requires some place to capture an image from, the example below starts with a device's media device (in other words a camera).

This example shows, roughly, a `MediaStreamTrack` extracted from a device's `MediaStream`. The track is then used to create an `ImageCapture` object so that `takePhoto()` and `grabFrame()` can be called. Finally, it shows how to apply the results of these calls to a canvas object.

```js
let imageCapture;

function onGetUserMediaButtonClick() {
  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then((mediaStream) => {
      document.querySelector("video").srcObject = mediaStream;

      const track = mediaStream.getVideoTracks()[0];
      imageCapture = new ImageCapture(track);
    })
    .catch((error) => console.error(error));
}

function onGrabFrameButtonClick() {
  imageCapture
    .grabFrame()
    .then((imageBitmap) => {
      const canvas = document.querySelector("#grabFrameCanvas");
      drawCanvas(canvas, imageBitmap);
    })
    .catch((error) => console.error(error));
}

function onTakePhotoButtonClick() {
  imageCapture
    .takePhoto()
    .then((blob) => createImageBitmap(blob))
    .then((imageBitmap) => {
      const canvas = document.querySelector("#takePhotoCanvas");
      drawCanvas(canvas, imageBitmap);
    })
    .catch((error) => console.error(error));
}

/* Utils */

function drawCanvas(canvas, img) {
  canvas.width = getComputedStyle(canvas).width.split("px")[0];
  canvas.height = getComputedStyle(canvas).height.split("px")[0];
  let ratio = Math.min(canvas.width / img.width, canvas.height / img.height);
  let x = (canvas.width - img.width * ratio) / 2;
  let y = (canvas.height - img.height * ratio) / 2;
  canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
  canvas
    .getContext("2d")
    .drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      x,
      y,
      img.width * ratio,
      img.height * ratio,
    );
}

document.querySelector("video").addEventListener("play", () => {
  document.querySelector("#grabFrameButton").disabled = false;
  document.querySelector("#takePhotoButton").disabled = false;
});
```
