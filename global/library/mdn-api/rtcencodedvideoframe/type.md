---
title: "RTCEncodedVideoFrame: type property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcencodedvideoframe/type/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCEncodedVideoFrame: type property

The **`type`** read-only property of the `RTCEncodedVideoFrame` interface indicates whether this frame is a key frame or a delta frame.

## Value

The type can have one of the following values:

- `key`
    This is a "key frame", which contains all the information needed to render an image.
    It can be decoded without reference to any other frames.
- `delta`
    This is a "delta frame", which contains changes to an image relative to some previous frame.
    The frame cannot be decoded without access to the frame(s) that it references.

## Examples

The implementation of a `transform()` function in a WebRTC Encoded Transform can look at the `type` and modify the transform code based on whether it is dealing with a key frame or delta frame:

```js
const transformer = new TransformStream({
  async transform(encodedFrame, controller) {
    if (encodedFrame.type === "key") {
      // Apply key frame transformation
    } else {
      // Apply delta frame transformation
    }
    controller.enqueue(encodedFrame);
  },
});
```

## See also

- Using WebRTC Encoded Transforms
