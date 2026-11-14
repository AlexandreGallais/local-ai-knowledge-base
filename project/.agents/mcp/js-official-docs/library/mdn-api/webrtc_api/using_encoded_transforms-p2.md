---
title: "Using WebRTC Encoded Transforms (part 2 of 2)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webrtc_api/using_encoded_transforms/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Using WebRTC Encoded Transforms (part 2 of 2)

## Worker implementation

The worker script must implement a handler for the `rtctransform` event, creating a pipe chain that pipes the `event.transformer.readable` (`ReadableStream`) stream through a `TransformStream` to the `event.transformer.writable` (`WritableStream`) stream.

A worker might support transforming incoming or outgoing encoded frames, or both, and the transform might be hard coded, or configured at run-time using information passed from the web application.

### Basic <example-value> Encoded Transform

The example below shows a basic <example-value> Encoded transform, which negates all bits in queued frames.
It does not use or need options passed in from the main thread because the same algorithm can be used in the sender pipeline to negate the bits and in the receiver pipeline to restore them.

The code implements an event handler for the `rtctransform` event.
This constructs a `TransformStream`, then pipes through it using `ReadableStream.pipeThrough()`, and finally pipes to `event.transformer.writable` using `ReadableStream.pipeTo()`.

```js
addEventListener("rtctransform", (event) => {
  const transform = new TransformStream({
    start() {}, // Called on startup.
    flush() {}, // Called when the stream is about to be closed.
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

The implementation of the WebRTC encoded transform is similar to a "generic" `TransformStream`, but with some important differences.
Like the generic stream, its constructor takes an object that defines an _optional_ `start()` method, which is called on construction, `flush()` method, which is called as the stream is about to be closed, and `transform()` method, which is called every time there is a chunk to be processed.
Unlike the generic constructor any `writableStrategy` or `readableStrategy` properties that are passed in the constructor object are ignored, and the queuing strategy is entirely managed by the user agent.

The `transform()` method also differs in that it is passed either an `RTCEncodedVideoFrame` or `RTCEncodedAudioFrame` rather than a generic "chunk".
The actual code shown here for the method isn't notable other than it demonstrates how to convert the frame to a form where you can modify it and enqueue it afterwards on the stream.

### Using separate sender and receiver transforms

The previous example works if the transform function is the same when sending and receiving, but in many cases the algorithms will be different.
You could use separate worker scripts for the sender and receiver, or handle both cases in one worker as shown below.

If the worker is used for both sender and receiver, it needs to know whether the current encoded frame is outgoing from a codec, or incoming from the packetizer.
This information can be specified using the second option in the `RTCRtpScriptTransform` constructor.
For example, we can define a separate `RTCRtpScriptTransform` for the sender and receiver, passing the same worker, and an options object with property `name` that indicates whether the transform is used in the sender or receiver (as shown in previous sections above).
The information is then available in the worker in `event.transformer.options`.

In this example we implement the `onrtctransform` event handler on the global dedicated worker scope object.
The value of the `name` property is used to determine which `TransformStream` to construct (the actual constructor methods are not shown).

```js
// Code to instantiate transform and attach them to sender/receiver pipelines.
onrtctransform = (event) => {
  let transform;
  if (event.transformer.options.name === "senderTransform")
    transform = createSenderTransform(); // returns a TransformStream
  else if (event.transformer.options.name === "receiverTransform")
    transform = createReceiverTransform(); // returns a TransformStream
  else return;
  event.transformer.readable
    .pipeThrough(transform)
    .pipeTo(event.transformer.writable);
};
```

Note that the code to create the pipe chain is the same as in the previous example.

### Runtime communication with the transform

The `RTCRtpScriptTransform` constructor allows you to pass <example-value> and transfer objects to the worker.
In the previous example we passed static information, but sometimes you might want to modify the transform algorithm in the worker at runtime, or get information back from the worker.
For example, a WebRTC conference call that supports encryption might need to add a new key to the algorithm used by the transform.

While it is possible to share information between the worker running the transform code and the main thread using `Worker.postMessage()`, it is generally easier to share a `MessageChannel` as an `RTCRtpScriptTransform` constructor option, because then the channel context is directly available in the `event.transformer.options` when you are handling a new encoded frame.

The code below creates a `MessageChannel` and transfers its second port to the worker.
The main thread and transform can subsequently communicate using the first and second ports.

```js
// Create a worker containing a TransformStream
const worker = new Worker("worker.js");

// Create a channel
// Pass channel.port2 to the transform as a constructor option
// and also transfer it to the worker
const channel = new MessageChannel();
const transform = new RTCRtpScriptTransform(
  worker,
  { purpose: "encrypt", port: channel.port2 },
  [channel.port2],
);

// Use the port1 to send a string.
// (we can send and transfer basic <example-value>).
channel.port1.postMessage("A message for the worker");
channel.port1.start();
```

In the worker the port is available as `event.transformer.options.port`.
The code below shows how you might listen on the port's `message` event to get messages from the main thread.
You can also use the port to send messages back to the main thread.

```js
event.transformer.options.port.onmessage = (event) => {
  // The message payload is in 'event.data';
  console.log(event.data);
};
```

### Triggering a key frame

Raw video is rarely sent or stored because it consumes a lot of space and bandwidth to represent each frame as a complete image.
Instead, codecs periodically generate a "key frame" that contains enough information to construct a full image, and between key <example-value> sends "delta frames" that just include the changes since the last delta frame.
While this is far more efficient that sending raw video, it means that in order to display the image associated with a particular delta frame, you need the last key frame and all subsequent delta frames.

This can cause a delay for new users joining a WebRTC conference application, because they can't display video until they have received their first key frame.
Similarly, if an encoded transform was used to encrypt frames, the recipient would not be able to display video until they get the first key frame encrypted with their key.

In order to ensure that a new key frame can be sent as early as possible when needed, the `RTCRtpScriptTransformer` object in `event.transformer` has two methods: `RTCRtpScriptTransformer.generateKeyFrame()`, which causes the codec to generate a key frame, and `RTCRtpScriptTransformer.sendKeyFrameRequest()`, which a receiver can use to request a key frame from the sender.

The example below shows how the main thread might pass an encryption key to a sender transform, and trigger the codec to generate a key frame.
Note that the main thread doesn't have direct access to the `RTCRtpScriptTransformer` object, so it needs to pass the key and restriction identifier ("rid") to the worker (the "rid" is a stream id, which indicates the encoder that must generate the key frame).
Here we do that with a `MessageChannel`, using the same pattern as in the previous section.
The code assumes there is already a peer connection, and that `videoSender` is an `RTCRtpSender`.

```js
const worker = new Worker("worker.js");
const channel = new MessageChannel();

videoSender.transform = new RTCRtpScriptTransform(
  worker,
  { name: "senderTransform", port: channel.port2 },
  [channel.port2],
);

// Post rid and new key to the sender
channel.port1.start();
channel.port1.postMessage({
  rid: "1",
  key: "93ae0927a4f8e527f1gce6d10bc6ab6c",
});
```

The `rtctransform` event handler in the worker gets the port and uses it to listen for `message` events from the main thread.
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

The code for a receiver to request a new key frame would be almost identical, except that "rid" isn't specified.
Here is the code for just the port message handler:

```js
event.transformer.options.port.onmessage = (event) => {
  const { key } = event.data;
  // key is used by the transformer to decrypt frames (not shown)

  // Request sender to emit a key frame.
  transformer.sendKeyFrameRequest();
};
```

## See also

- `RTCRtpScriptTransform`
- `RTCRtpReceiver.transform`
- `RTCRtpSender.transform`
- `rtctransform` event
- `RTCTransformEvent`
- `RTCRtpScriptTransformer`
- `RTCEncodedVideoFrame`
- `RTCEncodedAudioFrame`
