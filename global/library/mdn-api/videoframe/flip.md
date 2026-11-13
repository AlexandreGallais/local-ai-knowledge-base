---
title: "VideoFrame: flip property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/videoframe/flip/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# VideoFrame: flip property

The **`flip`** property of the `VideoFrame` interface returns a boolean that indicates whether the `VideoFrame` is horizontally mirrored.

## Value

A boolean. If `true`, horizontal mirroring is applied. Defaults to `false`.

## Examples

### Detecting when a camera video is flipped

Given a stream of video frames from a camera, obtained using a `MediaStreamTrackProcessor`, you can check the `flip` property on the `VideoFrame` objects to see whether or not the frames are flipped.

```js
const stream = await navigator.mediaDevices.getUserMedia({ video: true });
const track = stream.getTracks()[0];

const trackProcessor = new MediaStreamTrackProcessor(track);

const reader = trackProcessor.readable.getReader();
while (true) {
  const result = await reader.read();
  if (result.done) break;
  const frameFromCamera = result.value;
  // Returns `true` if the frame is horizontally flipped
  console.log(frameFromCamera.flip);
}
```
