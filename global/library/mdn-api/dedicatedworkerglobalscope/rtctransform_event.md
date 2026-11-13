---
title: "DedicatedWorkerGlobalScope: rtctransform event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/dedicatedworkerglobalscope/rtctransform_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DedicatedWorkerGlobalScope: rtctransform event

The **`rtctransform`** event is fired at a worker's `DedicatedWorkerGlobalScope` object when an encoded video or audio frame has been queued for processing by a `WebRTC Encoded Transform`.

The event's `transformer` property returns a `RTCRtpScriptTransformer` that exposes the `ReadableStream` on which the frame is queued, and a `WritableStream` where the frame can be written to inject it back into the WebRTC pipeline.

This event is not cancellable and does not bubble.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("rtctransform", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onrtctransform = (event) => { }
```

## Event type

A `RTCTransformEvent`. Inherits from `Event`.

## Example

The following code snippet shows a handler for the `rtctransform` event in the worker, added to the global scope using `addEventListener()`.
The `event.transformer` is a `RTCRtpScriptTransformer`, the worker side counterpart to `RTCRtpScriptTransform`.

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

The `rtctransform` event is fired when an encoded frame is enqueued on the `RTCRtpScriptTransformer` and just once when the transformer's corresponding `RTCRtpScriptTransformer` is constructed.
The code first determines what transform to apply using `name` value passed in the options (this allows `RTCRtpScriptTransform` instances added to the incoming and outgoing WebRTC pipelines to share a single worker).
Encoded frames are then piped from the readable, through the selected transform `TransformStream`, to a writeable.
The actual transforming code is not shown.

Note that this code is part of a more complete example provided in `Using WebRTC Encoded Transforms`.

## See also

- `Using WebRTC Encoded Transforms`
