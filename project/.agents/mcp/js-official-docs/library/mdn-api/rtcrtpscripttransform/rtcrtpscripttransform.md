---
title: "RTCRtpScriptTransform: RTCRtpScriptTransform() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcrtpscripttransform/rtcrtpscripttransform/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCRtpScriptTransform: RTCRtpScriptTransform() constructor

The **`RTCRtpScriptTransform()`** constructor creates a new `RTCRtpScriptTransform` object.

Constructing the `RTCRtpScriptTransform` creates a counterpart `RTCRtpScriptTransformer` in the specified worker, along with passed options (if any). Objects in the third parameter to the constructor are transferred.

The `rtctransform` event is then fired at the worker global object.
Worker code can use the `event.transformer` property to get the counterpart `RTCRtpScriptTransformer`, and `event.transformer.options` is used to get the options.

Note that the options are primarily used to inform the worker whether the transformer is processing incoming or outgoing frames, so that it can apply an appropriate transform.

## Syntax

```js
new RTCRtpScriptTransform(worker)
new RTCRtpScriptTransform(worker, options)
new RTCRtpScriptTransform(worker, options, transfer)
```

### Parameters

- `worker`
    A `Worker`, which will define code for one or more WebRTC transform streams.
- `options` (optional)
    An arbitrary object that will be made available in the worker.
    This is most commonly used to inform the worker whether it injected into the WebRTC sender or receiver pipeline, and hence which transform should be applied.
    However it may also be used to send any other object, such as a `MessagePort` for communicating dynamically with the transformer.
- `transfer` (optional)
    An optional array of transferable objects that will be transferred to the worker.
    After transfer, these objects are unusable in the main thread.

### Exceptions

- `DataCloneError` `DOMException`
    Thrown if an object in `transfer` cannot be transferred.

## Examples

The first example below shows construction of a `RTCRtpScriptTransform` that is then assigned to a `RTCRtpSender.transform`.
The constructor takes an optional object with the property `name` and `senderTransform`.
The worker can use this option to understand when it is transforming encoded frames from the encoder (rather than incoming frames from the packetizer).

```js
// Create a worker containing a TransformStream
const worker = new Worker("worker.js");
videoSender.transform = new RTCRtpScriptTransform(worker, {
  name: "senderTransform",
});
```

Any property name and value can be used in the options, as long as they can be serialized (and transferred if specified in the last constructor parameter).
The code below transfers the second port of a `MessageChannel` to the worker, which we might do in order to dynamically update transform code with (say) a new encryption key.

```js
// Create a worker containing a TransformStream
const worker = new Worker("worker.js");
const channel = new MessageChannel();

const transform = new RTCRtpScriptTransform(
  worker,
  { purpose: "encrypt", port: channel.port2 },
  [channel.port2],
);
```

## See also

- Using WebRTC Encoded Transforms
- `RTCRtpSender.transform`
- `RTCRtpReceiver.transform`
