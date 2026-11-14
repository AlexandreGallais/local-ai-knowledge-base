---
title: "CropTarget"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/croptarget/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CropTarget

The **`CropTarget`** interface of the `Screen Capture API` provides a static method, `fromElement()`, which returns a `CropTarget` instance that can be used to crop a captured video track to the area in which a specified element is rendered.

## Static methods

- `fromElement()` (experimental)
    Returns a `CropTarget` instance that can be used to crop a captured video track to the area in which a specified element is rendered.

## Examples

```js
// Options for getDisplayMedia()
const displayMediaOptions = {
  preferCurrentTab: true,
};

// Create crop target from DOM element
const demoElem = document.querySelector("#demo");
const cropTarget = await CropTarget.fromElement(demoElem);

// Capture video stream from user's webcam and isolate video track
const stream =
  await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
const [track] = stream.getVideoTracks();

// Crop video track
await track.cropTo(cropTarget);

// Broadcast cropped stream in <video> element
videoElem.srcObject = stream;
```

See Using the Element Capture and Region Capture APIs for in-context example code.

## See also

- Screen Capture API
- Using the Element Capture and Region Capture APIs
