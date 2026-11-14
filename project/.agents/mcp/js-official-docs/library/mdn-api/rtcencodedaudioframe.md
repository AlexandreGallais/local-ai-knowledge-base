---
title: "RTCEncodedAudioFrame"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcencodedaudioframe/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCEncodedAudioFrame

The **`RTCEncodedAudioFrame`** of the WebRTC API represents an encoded audio frame in the WebRTC receiver or sender pipeline, which may be modified using a WebRTC Encoded Transform.

The interface provides methods and properties to get metadata about the frame, allowing its format and order in the sequence of frames to be determined.
The `data` property gives access to the encoded frame data as a buffer, which might be encrypted, or otherwise modified by a transform.

## Constructor

- `RTCEncodedAudioFrame()`
    Copy constructor. Creates a new and independent `RTCEncodedAudioFrame` object from a frame, optionally overwriting some of the copied metadata.

## Instance properties

- `RTCEncodedAudioFrame.timestamp` (read-only) (deprecated) (non-standard)
    Returns the timestamp at which sampling of the frame started.
- `RTCEncodedAudioFrame.data`
    Return a buffer containing the encoded frame data.

## Instance methods

- `RTCEncodedAudioFrame.getMetadata()`
    Returns the metadata associated with the frame.

## Examples

### Transforming an encoded audio frame

This code snippet shows a handler for the `rtctransform` event in a `Worker` that implements a `TransformStream`, and pipes encoded frames through it from the `event.transformer.readable` to `event.transformer.writable` (`event.transformer` is a `RTCRtpScriptTransformer`, the worker-side counterpart of `RTCRtpScriptTransform`).

If the transformer is inserted into an audio stream, the `transform()` method is called with a `RTCEncodedAudioFrame` whenever a new frame is enqueued on `event.transformer.readable`.
The `transform()` method shows how this might be read, modified using a fictional encryption function, and then enqueued on the controller (this ultimately pipes it through to the `event.transformer.writable`, and then back into the WebRTC pipeline).

```js
addEventListener("rtctransform", (event) => {
  const transform = new TransformStream({
    async transform(encodedFrame, controller) {
      // Reconstruct the original frame.
      const view = new DataView(encodedFrame.data);

      // Construct a new buffer
      const newData = new ArrayBuffer(encodedFrame.data.byteLength);
      const newView = new DataView(newData);

      // Encrypt frame bytes using the encryptFunction() method (not shown)
      for (let i = 0; i < encodedFrame.data.byteLength; ++i) {
        const encryptedByte = encryptFunction(~view.getInt8(i));
        newView.setInt8(i, encryptedByte);
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

Note that more complete examples are provided in Using WebRTC Encoded Transforms.

## See also

- Using WebRTC Encoded Transforms
- `TransformStream`
- `RTCRtpScriptTransformer`
- `RTCEncodedVideoFrame`
