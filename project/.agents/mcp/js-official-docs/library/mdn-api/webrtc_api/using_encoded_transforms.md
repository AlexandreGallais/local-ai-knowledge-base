---
title: "Using WebRTC Encoded Transforms (part 1 of 2)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webrtc_api/using_encoded_transforms/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Using WebRTC Encoded Transforms

WebRTC Encoded Transforms provide a mechanism to inject a high performance Stream API for modifying encoded video and audio frame into the incoming and outgoing WebRTC pipelines.
This enables use cases such as end-to-end encryption of encoded frames by third-party code.

The API defines both main thread and worker side objects.
The main-thread interface is a `RTCRtpScriptTransform` instance, which on construction specifies the `Worker` that is to implement the transformer code.
The transform running in the worker is inserted into the incoming or outgoing WebRTC pipeline by adding the `RTCRtpScriptTransform` to `RTCRtpReceiver.transform` or `RTCRtpSender.transform`, respectively.

A counterpart `RTCRtpScriptTransformer` object is created in the worker thread, which has a `ReadableStream` `readable` property, a `WritableStream` `writable` property, and an `options` object passed from the associated `RTCRtpScriptTransform` constructor.
Encoded video frames (`RTCEncodedVideoFrame`) or audio frames (`RTCEncodedAudioFrame`) from the WebRTC pipeline are enqueued on `readable` for processing.

The `RTCRtpScriptTransformer` is made available to code as the `transformer` property of the `rtctransform` event, which is fired at the worker global scope whenever an encoded frame is enqueued for processing (and initially on construction of the corresponding `RTCRtpScriptTransform`).
The worker code must implement a handler for the event that reads encoded frames from `transformer.readable`, modifies them as needed, and writes them to `transformer.writable` in the same order and without any duplication.

While the interface doesn't place any other restrictions on the implementation, a natural way to transform the frames is to create a pipe chain that sends frames enqueued on the `event.transformer.readable` stream through a `TransformStream` to the `event.transformer.writable` stream.
We can use the `event.transformer.options` property to configure any transform code that depends on whether the transform is enqueuing incoming frames from the packetizer or outgoing frames from a codec.

The `RTCRtpScriptTransformer` interface also provides methods that can be used when sending encoded video to get the codec to generate a "key" frame, and when receiving video to request that a new key frame be sent.
These may be useful to allow a recipient to start viewing the video more quickly, if (for example) they join a conference call when delta frames are being sent.

The following examples provide more specific examples of how to use the framework using a `TransformStream` based implementation.

## Test if encoded transforms are supported

Test if encoded transforms are supported by checking for the existence of `RTCRtpSender.transform` (or `RTCRtpReceiver.transform`):

```js
const supportsEncodedTransforms =
  window.RTCRtpSender && "transform" in RTCRtpSender.prototype;
```

## Adding a transform for outgoing frames

A transform running in a worker is inserted into the outgoing WebRTC pipeline by assigning its corresponding `RTCRtpScriptTransform` to the `RTCRtpSender.transform` for an outgoing track.

This example shows how you might stream video from a user's webcam over WebRTC, adding a WebRTC encoded transform to modify the outgoing streams.
The code assumes that there is an `RTCPeerConnection` called `peerConnection` that is already connected to a remote peer.

First we get a `MediaStreamTrack`, using `getUserMedia()` to get a video `MediaStream` from a media device, and then the `MediaStream.getTracks()` method to get the first `MediaStreamTrack` in the stream.

The track is added to the peer connection using `addTrack()`, which starts streaming it to the remote peer.
The `addTrack()` method returns the `RTCRtpSender` that is being used to send the track.

```js
// Get Video stream and MediaTrack
const stream = await navigator.mediaDevices.getUserMedia({ video: true });
const [track] = stream.getTracks();
const videoSender = peerConnection.addTrack(track, stream);
```

An `RTCRtpScriptTransform` is then constructed taking a worker script, which defines the transform, and an optional object that can be used to pass <example-value> messages to the worker (in this case we've used a `name` property with value "senderTransform" to tell the worker that this transform will be added to the outbound stream).
We add the transform to the outgoing pipeline by assigning it to the `RTCRtpSender.transform` property.

```js
// Create a worker containing a TransformStream
const worker = new Worker("worker.js");
videoSender.transform = new RTCRtpScriptTransform(worker, {
  name: "senderTransform",
});
```

The Using separate sender and receiver transforms section below shows how the `name` might be used in a worker.

Note that you can add the transform at any time, but by adding it immediately after calling `addTrack()` the transform will get the first encoded frame that is sent.

## Adding a transform for incoming frames

A transform running in a worker is inserted into the incoming WebRTC pipeline by assigning its corresponding `RTCRtpScriptTransform` to the `RTCRtpReceiver.transform` for an incoming track.

This example shows how you add a transform to modify an incoming stream.
The code assumes that there is an `RTCPeerConnection` called `peerConnection` that is already connected to a remote peer.

First we add an `RTCPeerConnection` `track` event handler to catch the event when the peer starts receiving a new track.
Within the handler we construct an `RTCRtpScriptTransform` and add it to `event.receiver.transform` (`event.receiver` is a `RTCRtpReceiver`).
As in the previous section, the constructor takes an object with `name` property, but here we use `receiverTransform` as the value to tell the worker that frames are incoming.

```js
peerConnection.ontrack = (event) => {
  const worker = new Worker("worker.js");
  event.receiver.transform = new RTCRtpScriptTransform(worker, {
    name: "receiverTransform",
  });
  receivedVideo.srcObject = event.streams[0];
};
```

Note again that you can add the transform stream at any time.
However by adding it in the `track` event handler ensures that the transform stream will get the first encoded frame for the track.
