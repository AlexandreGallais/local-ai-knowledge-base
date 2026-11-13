---
title: "VideoFrame: rotation property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/videoframe/rotation/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# VideoFrame: rotation property

The **`rotation`** property of the `VideoFrame` interface returns the rotation of the video frame.

## Value

An integer representing the rotation (0, 90, 180, or 270) in degrees clockwise. Defaults to `0`. Arbitrary numbers (including negatives) are rounded to the next quarter turn.

## Examples

### Detecting when a camera video is rotated

Given a stream of video frames from a camera, obtained using a `MediaStreamTrackProcessor`, you can check the `rotation` property on the `VideoFrame` objects to see whether or not the frames are rotated.

```js
const stream = await navigator.mediaDevices.getUserMedia({ video: true });
const track = stream.getTracks()[0];

const trackProcessor = new MediaStreamTrackProcessor(track);

const reader = trackProcessor.readable.getReader();
while (true) {
  const result = await reader.read();
  if (result.done) break;
  const frameFromCamera = result.value;
  // Returns 0, 90, 180, or 270 indicating the frame's rotation
  console.log(frameFromCamera.rotation);
}
```
