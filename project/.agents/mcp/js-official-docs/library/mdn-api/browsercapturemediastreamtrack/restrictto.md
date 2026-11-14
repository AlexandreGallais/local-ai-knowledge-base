---
title: "BrowserCaptureMediaStreamTrack: restrictTo() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/browsercapturemediastreamtrack/restrictto/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# BrowserCaptureMediaStreamTrack: restrictTo() method

The **`restrictTo()`** method of the `BrowserCaptureMediaStreamTrack` interface restricts a self-capture stream to a specific DOM element (and its descendants).

## Syntax

```js
restrictTo(restrictionTarget)
```

### Parameters

- `restrictionTarget`
    A `RestrictionTarget` instance representing the element the stream should be restricted to, or `null`/`undefined`, in which case any previously-set restriction is removed from the track.

### Return value

A `Promise` that resolves to `undefined`.

The promise will reject if:

- The track `kind` is not `"video"`, or its `readyState` is not `"live"`.
- The restriction target element no longer exists.
- The track being restricted is not a track captured from the user's screen.
- `restrictionTarget` is not a `RestrictionTarget` instance, `null`, or `undefined`.
- `restrictionTarget` was created in a tab other than the one being captured.

> **Note:**
> In Chromium, if a track has clones, `restrictTo()` will reject (see Chrome issue 41482026).

## Examples

### Basic <example-value> example

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

### Stopping the restriction

You can stop the restriction by making a call to `restrictTo()` on the same track, passing an argument of `null` to it:

```js
// Stop restricting
await track.restrictTo(null);
```

## See also

- Screen Capture API
- Using the Element Capture and Region Capture APIs
