---
title: "RTCRtpScriptTransformer: generateKeyFrame() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcrtpscripttransformer/generatekeyframe/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCRtpScriptTransformer: generateKeyFrame() method

The **`generateKeyFrame()`** method of the `RTCRtpScriptTransformer` interface causes a video encoder to generate a key frame.

## Syntax

```js
generateKeyFrame()
generateKeyFrame(rid)
```

### Parameters

- `rid` (optional)
    A string containing the "restriction identifier" ("RID") of the stream/encoder that must generate the new key frame.

    The value must have between 1 and 255 characters (inclusive), and contain only the alphanumeric characters, underscore, and hyphen (`A-Z`, `a-z`, `0-9`, `-`, `_`).
    RIDs are case sensitive and must be unique for the peer communication channel.

    The first encoder that matches the specified `rid` is used.
    If no encoder matches the `rid` then the first encoder is used, and `rid` is set to the encoder's restrictions.

### Return value

A `Promise` that fulfills with the timestamp of the frame, or rejects with an exception value.

### Exceptions

- `InvalidStateError` `DOMException`
    The encoder is not processing video frames, or is `undefined`.
- `TypeError`
    The provided `rid` but does not conform to the grammar requirements.
- `NotFoundError` `DOMException`
    There are no video encoders. This might be raised if the corresponding `RTCRtpSender` is not active or its track is ended.

## Description

This method can be called by a transformer that is processing outgoing encoded video frames to force a new complete (key) frame to be sent.
It might be needed by a WebRTC Encoded Transform that encrypts frames, to ensure that if a new encryption key is added, a key frame encrypted with that key is sent as soon as possible.

The sender can specify a RID (also referred to as a "restriction identifier" or "RTP stream ID") to control what codec generates the new key frame.
A stream might contain (simulcast) multiple versions of the same source, each with different properties such as resolution and frame rate.
The RID is used to indicate a specific RTP stream, and hence the encoder that needs to generate a new frame.
Note that the available RID values are set when the transceiver used by the connection is created.
The RID values being used can be queried by calling `RTCRtpSender.getParameters()` and inspecting the `encodings` property of the returned value.

The promise returned by the method will resolve just before enqueuing the corresponding key frame in a `RTCRtpScriptTransformer` readable.

> **Note:**
> Sending multiple streams (RID) at a time is called "simulcast".
> This feature provides a middlebox with the same stream in multiple levels of video quality, allowing it to manage bandwidth by selectively transmitting appropriate levels to participants and switch resolution rapidly on the fly (i.e., switching to forward low-quality video for everyone except the active speaker).
> The recipient only ever gets one stream, which is why the comparable receiver method `RTCRtpScriptTransformer.sendKeyFrameRequest()` does not require that an RID is specified.

## Examples

### Sending a key frame

The example below shows how the main thread might pass an encryption key to a sender transform, and trigger the codec to generate a key frame.

Note that the main thread doesn't have direct access to the `RTCRtpScriptTransformer` object, so it needs to pass the key and RID to the worker.
Here we do that with a `MessageChannel`, transferring the second port to the transformer code running in the worker.
The code assumes there is already a peer connection, and `videoSender` is an `RTCRtpSender`.

```js
const worker = new Worker("worker.js");
const channel = new MessageChannel();

videoSender.transform = new RTCRtpScriptTransform(
  worker,
  { name: "senderTransform", port: channel.port2 },
  [channel.port2],
);

// Post RID and new key to the sender
channel.port1.start();
channel.port1.postMessage({
  rid: "1",
  key: "93ae0927a4f8e527f1gce6d10bc6ab6c",
});
```

The `rtctransform` event handler in the worker gets the port and uses it to listen for `message` events.
If an event is received it gets the `rid` and `key`, and then calls `generateKeyFrame()`.

```js
event.transformer.options.port.onmessage = (event) => {
  const { rid, key } = event.data;
  // key is used by the transformer to encrypt frames (not shown)

  // Get codec to generate a new key frame using the rid
  // Here 'rcEvent' is the rtctransform event.
  rcEvent.transformer.generateKeyFrame(rid);
};
```

## See also

- Using WebRTC Encoded Transforms
