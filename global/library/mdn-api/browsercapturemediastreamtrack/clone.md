---
title: "BrowserCaptureMediaStreamTrack: clone() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/browsercapturemediastreamtrack/clone/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# BrowserCaptureMediaStreamTrack: clone() method

The **`clone()`** method of the `BrowserCaptureMediaStreamTrack` interface returns a clone of the original `BrowserCaptureMediaStreamTrack`.

This method is functionally identical to `MediaStreamTrack.clone()`, except that it handles cases where cropping or restriction have been applied to the track. The returned clone is identical to the original `BrowserCaptureMediaStreamTrack`, but with any cropping or restriction removed.

> **Note:**
> In Chromium, if a track has clones, its `cropTo()` and `restrictTo()` methods will reject (see Chrome issue 41482026).

## Syntax

```js
clone()
```

### Parameters

None.

### Return value

A `BrowserCaptureMediaStreamTrack` instance.

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

// Create uncropped clone of the track
const clonedTrack = track.clone();
```

## See also

- Screen Capture API
- Using the Element Capture and Region Capture APIs
