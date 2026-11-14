---
title: "CanvasCaptureMediaStreamTrack"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/canvascapturemediastreamtrack/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CanvasCaptureMediaStreamTrack

The **`CanvasCaptureMediaStreamTrack`** interface of the `Media Capture and Streams API` represents the video track contained in a `MediaStream` being generated from a `<canvas>` following a call to `HTMLCanvasElement.captureStream()`.

## Instance properties

_This interface inherits the properties of its parent, `MediaStreamTrack`._

- `CanvasCaptureMediaStreamTrack.canvas` (read-only)
    Returns the `HTMLCanvasElement` object whose surface is captured in real-time.

## Instance methods

_This interface inherits the methods of its parent, `MediaStreamTrack`._

- `CanvasCaptureMediaStreamTrack.requestFrame()`
    Manually forces a frame to be captured and sent to the stream. This lets applications that wish to specify the frame capture times directly do so, if they specified a `frameRate` of 0 when calling `captureStream()`.

## See also

- `HTMLCanvasElement.captureStream()` to begin capturing frames from a canvas
