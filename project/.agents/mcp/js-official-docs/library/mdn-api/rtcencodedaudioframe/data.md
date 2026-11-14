---
title: "RTCEncodedAudioFrame: data property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcencodedaudioframe/data/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCEncodedAudioFrame: data property

The **`data`** property of the `RTCEncodedAudioFrame` interface returns a buffer containing the data for an encoded frame.

## Value

An `ArrayBuffer`.

## Examples

This example WebRTC encoded transform shows how you might get the frame data in a `TransformStream` `transform()` function modify the bits.

The `transform()` function constructs a `DataView` on the buffer in the frame `data` property, and also creates a view on a new `ArrayBuffer`.
It then writes the negated bytes in the original data to the new buffer, assigns the buffer to the encoded frame `data` property, and enqueues the modified frame on the stream.

```js
addEventListener("rtctransform", (event) => {
  const transform = new TransformStream({
    async transform(encodedFrame, controller) {
      // Reconstruct the original frame.
      const view = new DataView(encodedFrame.data);

      // Construct a new buffer
      const newData = new ArrayBuffer(encodedFrame.data.byteLength);
      const newView = new DataView(newData);

      // Negate all bits in the incoming frame
      for (let i = 0; i < encodedFrame.data.byteLength; ++i) {
        newView.setInt8(i, ~view.getInt8(i));
      }

      encodedFrame.data = newData;
      controller.enqueue(encodedFrame);
    },
  });
  event.transformer.readable
    .pipeThrough(transform)
    .pipeTo(event.transformer.writable);
});
```

Note that the surrounding code shown here is described in Using WebRTC Encoded Transforms.

## See also

- Using WebRTC Encoded Transforms
