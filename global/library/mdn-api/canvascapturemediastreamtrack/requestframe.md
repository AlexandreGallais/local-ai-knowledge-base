---
title: "CanvasCaptureMediaStreamTrack: requestFrame() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/canvascapturemediastreamtrack/requestframe/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CanvasCaptureMediaStreamTrack: requestFrame() method

The **`requestFrame()`** method of the `CanvasCaptureMediaStreamTrack` interface requests that a frame be captured from the canvas and sent to the stream.

Applications that need to carefully control
the timing of rendering and frame capture can use `requestFrame()` to
directly specify when it's time to capture a frame.

To prevent automatic capture of frames, so that frames are only captured when
`requestFrame()` is called, specify a value of 0 for the
`captureStream()` method when creating
the stream.

## Syntax

```js
requestFrame()
```

### Parameters

None.

### Return value

None (`undefined`).

## Usage notes

There is currently an issue flagged in the specification pointing out that at this
time, no exceptions are being thrown if the canvas isn't origin-clean. This may change
in the future, so it would be wise to plan ahead and watch for exceptions such as
`SecurityError` (although the specific error that might be thrown is not
mentioned in the spec, this is a likely candidate).

## Example

```js
// Find the canvas element to capture
const canvasElt = document.querySelector("canvas");

// Get the stream
const stream = canvasElt.captureStream(25); // 25 FPS

// Send the current state of the canvas as a frame to the stream
stream.getVideoTracks()[0].requestFrame();
```

## See also

- `CanvasCaptureMediaStreamTrack`, the interface it belongs to.
- `<canvas>`
