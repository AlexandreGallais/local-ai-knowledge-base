---
title: "RTCEncodedAudioFrame: RTCEncodedAudioFrame() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcencodedaudioframe/rtcencodedaudioframe/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCEncodedAudioFrame: RTCEncodedAudioFrame() constructor

The **`RTCEncodedAudioFrame()`** constructor creates a new and fully independent `RTCEncodedAudioFrame` object.

The new object is a deep clone of the original object data and metadata, with any metadata specified in the options parameter overwriting the copied values.

## Syntax

```js

new RTCEncodedAudioFrame(originalFrame);
new RTCEncodedAudioFrame(originalFrame, options);
```

### Parameters

- `originalFrame`
    The frame to be copied.
- `options` (optional)
    This is an object with the following property:
    - `metadata` (optional)
        An object setting the frame metadata.
        This is an object with the same properties as the object returned by `RTCEncodedAudioFrame.getMetadata()`.

### Exceptions

- `TypeError`
  - The source buffer is detached.
- `RangeError`
  - The allocation is too large.

## Examples

### Cloning a frame with modified metadata

This snippet shows how you might copy a frame and modify its metadata.
In this case we just update the capture time.

```js
// Frame is an incoming RTCEncodedAudioFrame
frame.getMetadata();

const newFrame = new RTCEncodedAudioFrame(frame, {
  metadata: {
    captureTime: frame.metadata.captureTime + 3,
  },
});
```

This kind of modification might be useful if you need to create multiple outgoing frames from a single incoming frame; for example, in order to relay media to another peer on the network.
Generally you will not need to modify the metadata for a frame.
