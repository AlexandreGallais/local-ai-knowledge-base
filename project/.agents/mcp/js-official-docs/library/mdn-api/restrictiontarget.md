---
title: "RestrictionTarget"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/restrictiontarget/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RestrictionTarget

The **`RestrictionTarget`** interface of the `Screen Capture API` provides a static method, `fromElement()`, which returns a `RestrictionTarget` instance that can be used to restrict a captured video track to a specified DOM element.

## Static methods

- `fromElement()` (experimental)
    Returns a `RestrictionTarget` instance that can be used to restrict a captured video track to a specified DOM element (plus its descendants).

## Examples

```js
// Options for getDisplayMedia()
const displayMediaOptions = {
  preferCurrentTab: true,
};

// Create restriction target from DOM element
const demoElem = document.querySelector("#demo");
const restrictionTarget = await RestrictionTarget.fromElement(demoElem);

// Capture video stream from user's webcam and isolate video track
const stream =
  await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
const [track] = stream.getVideoTracks();

// Restrict video track
await track.restrictTo(restrictionTarget);

// Broadcast restricted stream in <video> element
videoElem.srcObject = stream;
```

See Using the Element Capture and Region Capture APIs for in-context example code.

## See also

- Screen Capture API
- Using the Element Capture and Region Capture APIs
