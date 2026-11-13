---
title: "RTCPeerConnection: createAnswer() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcpeerconnection/createanswer/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCPeerConnection: createAnswer() method

The **`createAnswer()`** method of the `RTCPeerConnection` interface creates an SDP answer to an offer received from a remote peer during the offer/answer negotiation of a WebRTC connection.

The answer contains information about any media already attached to the session, codecs and options supported by the browser, and any ICE candidates already gathered.
The answer is delivered to the returned `Promise`, and should then be sent to the source of the offer to continue the negotiation process.

## Syntax

```js
createAnswer()
createAnswer(options)

createAnswer(successCallback, failureCallback) // deprecated
createAnswer(successCallback, failureCallback, options) // deprecated
```

### Parameters

- `options` (optional)
    An optional object providing options requested for the answer.
    Currently, there are no available options.

### Deprecated parameters

In older code and documentation, you may see a callback-based version of this function.
This has been deprecated and its use is **strongly** discouraged.
You should update any existing code to use the `Promise`-based version of `createAnswer()` instead.
The parameters for the older form of `createAnswer()` are described below, to aid in updating existing code.

- `successCallback` (deprecated)
    A callback function which will be passed a single `RTCSessionDescription` object describing the newly-created answer.
- `failureCallback` (deprecated)
    A callback function which will be passed a single `DOMException` object explaining why the request to create an answer failed.
- `options` (optional)
    An optional object providing options requested for the answer.

### Exceptions

- `NotReadableError` `DOMException`
    The identity provider wasn't able to provide an identity assertion.
- `OperationError` `DOMException`
    Generation of the SDP failed for some reason; this is a general failure catch-all exception.

### Return value

A `Promise` that fulfills with an object containing the same properties as an `RTCSessionDescription` object:

- `type`
    A string whose value is `"answer"`.
- `sdp`
    A string containing the SDP describing the session, to be delivered to the remote peer.

## Examples

Here is a segment of code taken from the code that goes with the article Signaling and video calling.
This code comes from the handler for the message sent to carry an offer to another peer across the signaling channel.

> **Note:**
> Keep in mind that this is part of the signaling process, the transport layer for which is an implementation detail that's entirely up to you.
> In this case, a WebSocket connection is used to send a JSON message with a `type` field with the value "video-answer" to the other peer, carrying the answer to the device which sent the offer to connect.
> The contents of the object being passed to the `sendToServer()` function, along with everything else in the promise fulfillment handler, depend entirely on your design

```js
pc.createAnswer()
  .then((answer) => pc.setLocalDescription(answer))
  .then(() => {
    // Send the answer to the remote peer through the signaling server.
  })
  .catch(handleGetUserMediaError);
```

This asks `RTCPeerConnection` to create and return a new answer.
In our promise handler, the returned answer is set as the description of the local end of the connection by calling `setLocalDescription()`.

Once that succeeds, the answer is sent to the signaling server using whatever protocol you see fit.

`Promise.catch()` is used to trap and handle errors.

See Handling the invitation in our WebRTC chat example to view the complete code from which this snippet is derived; that will help you understand the signaling process and how answers work.
