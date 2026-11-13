---
title: "RTCRtpScriptTransformer: readable property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcrtpscripttransformer/readable/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCRtpScriptTransformer: readable property

The **`readable`** read-only property of the `RTCRtpScriptTransformer` interface returns a `ReadableStream` instance is a source for encoded media frames.

When the corresponding `RTCRtpScriptTransform` is inserted into the WebRTC sender and receiver pipelines, this stream may be enqueued with outgoing or incoming encoded media frames (`RTCEncodedVideoFrame` or `RTCEncodedAudioFrame`).
A WebRTC encoded transform can read the frames, modify them as needed, and then send them back into the WebRTC pipeline by writing them to `RTCRtpScriptTransformer.writable`.
A common way to perform this operation is to pipe the frames through a `TransformStream`.

## Value

A `ReadableStream`.

## Examples

The following example shows how `readable` is piped through a `TransformStream` to `RTCRtpScriptTransformer.writable`.

```js
addEventListener("rtctransform", (event) => {
  let transform;
  // Select a transform based on passed options
  if (event.transformer.options.name === "senderTransform")
    transform = createSenderTransform(); // A TransformStream
  else if (event.transformer.options.name === "receiverTransform")
    transform = createReceiverTransform(); // A TransformStream
  else return;

  // Pipe frames from the readable to writeable through TransformStream
  event.transformer.readable
    .pipeThrough(transform)
    .pipeTo(event.transformer.writable);
});
```

The code implements a handler for the `rtctransform` event, which is fired at the global worker object on construction of the corresponding `RTCRtpScriptTransform`, and when new frames are enqueued for processing.
`event.transformer` is the `RTCRtpScriptTransformer` that has a `readable` and `writable` property.

A different `TransformStream` is created to process outgoing and incoming frames, using `createSenderTransform()` or `createReceiverTransform()`, respectively (implementations not shown).
The event handler chooses the correct transform stream to use based on options passed through from the `RTCRtpScriptTransform` constructor and assigns it to `transform`.

The code calls `ReadableStream.pipeThrough()` on the `readable` to pipe encoded frames through the selected `TransformStream`, and then `ReadableStream.pipeTo()` to pipe them to the `RTCRtpScriptTransformer.writable`.

## See also

- Using WebRTC Encoded Transforms
