---
title: "CanvasCaptureMediaStreamTrack: canvas property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/canvascapturemediastreamtrack/canvas/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CanvasCaptureMediaStreamTrack: canvas property

The **`canvas`** read-only property of the `CanvasCaptureMediaStreamTrack` interface returns the `HTMLCanvasElement` from which frames are being captured.

## Value

An `HTMLCanvasElement` indicating the canvas, which is the source of the frames being captured.

## Example

```js
// Find the canvas element to capture
const canvasElt = document.querySelector("canvas");

// Get the stream
const stream = canvasElt.captureStream(25); // 25 FPS

// Do things to the stream
// …

// Obtain the canvas associated with the stream
const canvas = stream.canvas;
```

## See also

- `HTMLCanvasElement.captureStream()` to create a stream to capture a
  given canvas element.
- `<canvas>`
