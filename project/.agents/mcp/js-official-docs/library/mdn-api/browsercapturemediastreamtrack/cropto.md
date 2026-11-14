---
title: "BrowserCaptureMediaStreamTrack: cropTo() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/browsercapturemediastreamtrack/cropto/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# BrowserCaptureMediaStreamTrack: cropTo() method

The **`cropTo()`** method of the `BrowserCaptureMediaStreamTrack` interface crops a self-capture stream to the area in which a specified DOM element is rendered.

## Syntax

```js
cropTo(cropTarget)
```

### Parameters

- `cropTarget`
    A `CropTarget` instance representing the element rendering area the stream should be cropped to, or `null`/`undefined`, in which case any previously-set cropping is removed from the track.

### Return value

A `Promise` that resolves to `undefined`.

The promise will reject if:

- The track `kind` is not `"video"`, or its `readyState` is not `"live"`.
- The crop target element no longer exists.
- The track being cropped is not a track captured from the user's screen.
- `cropTarget` is not a `CropTarget` instance, `null`, or `undefined`.
- `cropTarget` was created in a tab other than the one being captured.

> **Note:**
> In Chromium, if a track has clones, `cropTo()` will reject (see Chrome issue 41482026).

## Examples

### Basic <example-value> example

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

### Stopping the cropping

You can stop the cropping by making a call to `cropTo()` on a previously-cropped track, passing an argument of `null` to it:

```js
// Stop cropping
await track.cropTo(null);
```

## See also

- Screen Capture API
- Using the Element Capture and Region Capture APIs
