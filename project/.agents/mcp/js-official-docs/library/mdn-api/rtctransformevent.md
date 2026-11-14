---
title: "RTCTransformEvent"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtctransformevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCTransformEvent

The **`RTCTransformEvent`** of the WebRTC API represent an event that is fired in a dedicated worker when an encoded frame has been queued for processing by a WebRTC Encoded Transform.

The interface has a `transformer` property that exposes a readable stream and a writable stream.
A worker should read encoded frames from `transformer.readable`, modify them as needed, and write them to `transformer.writable` in the same order and without any duplication.

At time of writing there is just one event based on `RTCTransformEvent`: `rtctransform`.

## Instance properties

_Since `RTCTransformEvent` is based on `Event`, its properties are also available._

- `RTCTransformEvent.transformer` (read-only)
    Returns the `RTCRtpScriptTransformer` associated with the event.

## Transform event types

There is only one type of transform event.

### `rtctransform`

The `rtctransform` event is fired at the worker global scope on construction of an associated `RTCRtpScriptTransform`, and whenever a new encoded video or audio frame is enqueued for processing.

You can add a `rtctransform` event listener to be notified when the new frame is available using either `DedicatedWorkerGlobalScope.addEventListener()` or the `onrtctransform` event handler property.

## Example

This example creates an event listener for the `rtctransform` event.

The example assumes we have a `TransformStream` with an `options` object passed from a `RTCRtpScriptTransform` constructor in the main-thread.
The code at the end shows how the stream is piped through the transform stream from the `readable` to the `writable`.

```js
addEventListener("rtctransform", (event) => {
  let transform;
  // Select a transform based on passed options
  if (event.transformer.options.name === "senderTransform") {
    transform = createSenderTransform(); // A TransformStream (not shown)
  } else if (event.transformer.options.name === "receiverTransform") {
    transform = createReceiverTransform(); // A TransformStream (not shown)
  }
  // Pipe frames from the readable to writeable through TransformStream
  event.transformer.readable
    .pipeThrough(transform)
    .pipeTo(event.transformer.writable);
});
```

Note that this code is part of a more complete example provided in Using WebRTC Encoded Transforms.

## Browser compatibility

- Using WebRTC Encoded Transforms
- `TransformStream`
