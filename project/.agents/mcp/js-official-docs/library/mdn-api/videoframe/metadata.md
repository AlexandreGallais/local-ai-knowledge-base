---
title: "VideoFrame: metadata() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/videoframe/metadata/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# VideoFrame: metadata() method

The **`metadata()`** method of the `VideoFrame` interface returns the metadata associated with the frame.

## Syntax

```js
metadata()
```

### Parameters

None.

### Return value

An object containing metadata describing the video frame, as specified by the WebCodecs VideoFrame Metadata Registry.
This can contain the following properties:

- `rtpTimestamp` (optional)
    The RTP timestamp of the corresponding encoded frame. Video frames originating from WebRTC sources will have `rtpTimestamp` metadata. This allows applications using a `MediaStreamTrackProcessor` (for example, to render decoded WebRTC frames to a `<canvas>`) to correlate each exposed frame with its original RTP transport timestamp. This is useful for example when aligning video with audio segments or debugging latency issues.

If the video frame doesn't have any of the listed metadata items associated with it, `metadata()` will return an empty object.

## Examples

### Basic usage

```js
const metadata = frame.metadata();
```
