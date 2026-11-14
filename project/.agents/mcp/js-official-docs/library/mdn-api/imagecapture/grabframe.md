---
title: "ImageCapture: grabFrame() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/imagecapture/grabframe/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ImageCapture: grabFrame() method

The **`grabFrame()`** method of the
`ImageCapture` interface takes a snapshot of the live video in a
`MediaStreamTrack` and returns a `Promise` that resolves with
an `ImageBitmap` containing the snapshot.

## Syntax

```js
grabFrame()
```

### Parameters

None.

### Return value

A `Promise` that resolves to an `ImageBitmap` object.

### Exceptions

- `InvalidStateError` `DOMException`
    Thrown if `readyState` property of the `MediaStreamTrack` passing in the constructor is not `live`.
- `UnknownError` `DOMException`
    Thrown if the operation can't complete for any reason.

## Examples

This example is extracted from this Simple Image Capture demo. It shows how to use the `Promise` returned by
`grabFrame()` to copy the returned frame to a `<canvas>`
element. For simplicity it does not show how to instantiate the
`ImageCapture` object.

```js
let grabFrameButton = document.querySelector("button#grabFrame");
let canvas = document.querySelector("canvas");

grabFrameButton.onclick = grabFrame;

function grabFrame() {
  imageCapture
    .grabFrame()
    .then((imageBitmap) => {
      console.log("Grabbed frame:", imageBitmap);
      canvas.width = imageBitmap.width;
      canvas.height = imageBitmap.height;
      canvas.getContext("2d").drawImage(imageBitmap, 0, 0);
      canvas.classList.remove("hidden");
    })
    .catch((error) => {
      console.error("grabFrame() error: ", error);
    });
}
```
