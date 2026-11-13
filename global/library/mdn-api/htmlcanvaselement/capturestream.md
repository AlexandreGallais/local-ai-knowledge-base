---
title: "HTMLCanvasElement: captureStream() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlcanvaselement/capturestream/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLCanvasElement: captureStream() method

The **`captureStream()`** method of the `HTMLCanvasElement` interface returns a `MediaStream`
which includes a `CanvasCaptureMediaStreamTrack` containing a real-time video capture of the canvas's contents.

## Syntax

```js
captureStream()
captureStream(frameRate)
```

### Parameters

- `frameRate` (optional)
    A double-precision floating-point value that indicates the rate of capture of each
    frame. If not set, a new frame will be captured each time the canvas changes; if set
    to `0`, frames will not be captured automatically; instead, they will only
    be captured when the returned track's
    `requestFrame()` method is
    called.

### Return value

A reference to a `MediaStream` object, which has a single
`CanvasCaptureMediaStreamTrack` in it.

### Exceptions

- `NotSupportedError` `DOMException`
    Thrown if the value of `frameRate` is negative.

- `SecurityError` `DOMException`
    The canvas's bitmap is not origin clean;
    at least some of its contents have or may have been loaded from a site other than the one from which the document itself was loaded.

## Example

```js
// Find the canvas element to capture
const canvasElt = document.querySelector("canvas");

// Get the stream
const stream = canvasElt.captureStream(25); // 25 FPS

// Do things to the stream
// E.g. Send it to another computer using an RTCPeerConnection
//      pc is an RTCPeerConnection created elsewhere
stream.getTracks().forEach((track) => pc.addTrack(track, stream));
```

## See also

- `HTMLMediaElement.captureStream()`, which allows capturing a stream
  from a media element.
- `MediaStream`
- Media Capture and Streams API
