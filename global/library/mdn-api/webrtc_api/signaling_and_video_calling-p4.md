---
title: "Signaling and video calling (part 4 of 5)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webrtc_api/signaling_and_video_calling/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Signaling and video calling (part 4 of 5)

When the offer arrives, the callee's `handleVideoOfferMsg()` function is called with the `"video-offer"` message that was received. This function needs to do two things. First, it needs to create its own `RTCPeerConnection` and add the tracks containing the audio and video from its microphone and webcam to that. Second, it needs to process the received offer, constructing and sending its answer.

```js
function handleVideoOfferMsg(msg) {
  let localStream = null;

  targetUsername = msg.name;
  createPeerConnection();

  const desc = new RTCSessionDescription(msg.sdp);

  myPeerConnection
    .setRemoteDescription(desc)
    .then(() => navigator.mediaDevices.getUserMedia(mediaConstraints))
    .then((stream) => {
      localStream = stream;
      document.getElementById("local_video").srcObject = localStream;

      localStream
        .getTracks()
        .forEach((track) => myPeerConnection.addTrack(track, localStream));
    })
    .then(() => myPeerConnection.createAnswer())
    .then((answer) => myPeerConnection.setLocalDescription(answer))
    .then(() => {
      const msg = {
        name: myUsername,
        target: targetUsername,
        type: "video-answer",
        sdp: myPeerConnection.localDescription,
      };

      sendToServer(msg);
    })
    .catch(handleGetUserMediaError);
}
```

This code is very similar to what we did in the `invite()` function back in Starting a call. It starts by creating and configuring an `RTCPeerConnection` using our `createPeerConnection()` function. Then it takes the SDP offer from the received `"video-offer"` message and uses it to create a new `RTCSessionDescription` object representing the caller's session description.

That session description is then passed into `myPeerConnection.setRemoteDescription()`. This establishes the received offer as the description of the remote (caller's) end of the connection. If this is successful, the promise fulfillment handler (in the `then()` clause) starts the process of getting access to the callee's camera and microphone using `getUserMedia()`, adding the tracks to the connection, and so forth, as we saw previously in `invite()`.

Once the answer has been created using `myPeerConnection.createAnswer()`, the description of the local end of the connection is set to the answer's SDP by calling `myPeerConnection.setLocalDescription()`, then the answer is transmitted through the signaling server to the caller to let them know what the answer is.

Any errors are caught and passed to `handleGetUserMediaError()`, described in Handling getUserMedia() errors.

> **Note:**
> As is the case with the caller, once the `setLocalDescription()` fulfillment handler has run, the browser begins firing `icecandidate` events that the callee must handle, one for each candidate that needs to be transmitted to the remote peer.

Finally, the caller handles the answer message it received by creating a new `RTCSessionDescription` object representing the callee's session description and passing it into
`myPeerConnection.setRemoteDescription()`.

```js
function handleVideoAnswerMsg(msg) {
  const desc = new RTCSessionDescription(msg.sdp);
  myPeerConnection.setRemoteDescription(desc).catch(window.reportError);
}
```

##### Sending ICE candidates

The ICE negotiation process involves each peer sending candidates to the other, repeatedly, until it runs out of potential ways it can support the `RTCPeerConnection`'s media transport needs. Since ICE doesn't know about your signaling server, your code handles transmission of each candidate in your handler for the `icecandidate` event.

Your `onicecandidate` handler receives an event whose `candidate` property is the SDP describing the candidate (or is `null` to indicate that the ICE layer has run out of potential configurations to suggest). The contents of `candidate` are what you need to transmit using your signaling server. Here's our example's implementation:

```js
function handleICECandidateEvent(event) {
  if (event.candidate) {
    sendToServer({
      type: "new-ice-candidate",
      target: targetUsername,
      candidate: event.candidate,
    });
  }
}
```

This builds an object containing the candidate, then sends it to the other peer using the `sendToServer()` function previously described in Sending messages to the signaling server. The message's properties are:

- `type`
    The message type: `"new-ice-candidate"`.
- `target`
    The username the ICE candidate needs to be delivered to. This lets the signaling server route the message.
- `candidate`
    The SDP representing the candidate the ICE layer wants to transmit to the other peer.

The format of this message (as is the case with everything you do when handling signaling) is entirely up to you, depending on your needs; you can provide other information as required.

> **Note:**
> It's important to keep in mind that the `icecandidate` event is **not** sent when ICE candidates arrive from the other end of the call. Instead, they're sent by your own end of the call so that you can take on the job of transmitting the data over whatever channel you choose. This can be confusing when you're new to WebRTC.

##### Receiving ICE candidates

The signaling server delivers each ICE candidate to the destination peer using whatever method it chooses; in our example this is as JSON objects, with a `type` property containing the string `"new-ice-candidate"`. Our `handleNewICECandidateMsg()` function is called by our main WebSocket incoming message code to handle these messages:

```js
function handleNewICECandidateMsg(msg) {
  const candidate = new RTCIceCandidate(msg.candidate);

  myPeerConnection.addIceCandidate(candidate).catch(window.reportError);
}
```

This function constructs an `RTCIceCandidate` object by passing the received SDP into its constructor, then delivers the candidate to the ICE layer by passing it into `myPeerConnection.addIceCandidate()`. This hands the fresh ICE candidate to the local ICE layer, and finally, our role in the process of handling this candidate is complete.

Each peer sends to the other peer a candidate for each possible transport configuration that it believes might be viable for the media being exchanged. At some point, the two peers agree that a given candidate is a good choice and they open the connection and begin to share media. It's important to note, however, that ICE negotiation does _not_ stop once media is flowing. Instead, candidates may still keep being exchanged after the conversation has begun, either while trying to find a better connection method, or because they were already in transport when the peers successfully established their connection.

In addition, if something happens to cause a change in the streaming scenario, negotiation will begin again, with the `negotiationneeded` event being sent to the `RTCPeerConnection`, and the entire process starts again as described before. This can happen in a variety of situations, including:

- Changes in the network status, such as a bandwidth change, transitioning from Wi-Fi to cellular connectivity, or the like.
- Switching between the front and rear cameras on a phone.
- A change to the configuration of the stream, such as its resolution or frame rate.

##### Receiving new streams

When new tracks are added to the `RTCPeerConnection`— either by calling its `addTrack()` method or because of renegotiation of the stream's format—a `track` event is set to the `RTCPeerConnection` for each track added to the connection. Making use of newly added media requires implementing a handler for the `track` event. A common need is to attach the incoming media to an appropriate HTML element. In our example, we add the track's stream to the `` element that displays the incoming video:

```js
function handleTrackEvent(event) {
  document.getElementById("received_video").srcObject = event.streams[0];
  document.getElementById("hangup-button").disabled = false;
}
```

The incoming stream is attached to the `"received_video"` `` element, and the "Hang Up" `` element is enabled so the user can hang up the call.

Once this code has completed, finally the video being sent by the other peer is displayed in the local browser window!

##### Handling the removal of tracks

Your code receives a `removetrack` event when the remote peer removes a track from the connection by calling `RTCPeerConnection.removeTrack()`. Our handler for `"removetrack"` is:

```js
function handleRemoveTrackEvent(event) {
  const stream = document.getElementById("received_video").srcObject;
  const trackList = stream.getTracks();

  if (trackList.length === 0) {
    closeVideoCall();
  }
}
```

This code fetches the incoming video `MediaStream` from the `"received_video"` `` element's `srcObject` property, then calls the stream's `getTracks()` method to get an array of the stream's tracks.

If the array's length is zero, meaning there are no tracks left in the stream, we end the call by calling `closeVideoCall()`. This cleanly restores our app to a state in which it's ready to start or receive another call. See Ending the call to learn how `closeVideoCall()` works.

#### Ending the call

There are many reasons why calls may end. A call might have completed, with one or both sides having hung up. Perhaps a network failure has occurred, or one user might have quit their browser, or had a system crash. In any case, all good things must come to an end.

##### Hanging up

When the user clicks the "Hang Up" button to end the call, the `hangUpCall()` function is called:

```js
function hangUpCall() {
  closeVideoCall();
  sendToServer({
    name: myUsername,
    target: targetUsername,
    type: "hang-up",
  });
}
```

`hangUpCall()` executes `closeVideoCall()` to shut down and reset the connection and release resources. It then builds a `"hang-up"` message and sends it to the other end of the call to tell the other peer to neatly shut itself down.

##### Ending the call

The `closeVideoCall()` function, shown below, is responsible for stopping the streams, cleaning up, and disposing of the `RTCPeerConnection` object:

```js
function closeVideoCall() {
  const remoteVideo = document.getElementById("received_video");
  const localVideo = document.getElementById("local_video");

  if (myPeerConnection) {
    myPeerConnection.ontrack = null;
    myPeerConnection.onremovetrack = null;
    myPeerConnection.onremovestream = null;
    myPeerConnection.onicecandidate = null;
    myPeerConnection.oniceconnectionstatechange = null;
    myPeerConnection.onsignalingstatechange = null;
    myPeerConnection.onicegatheringstatechange = null;
    myPeerConnection.onnegotiationneeded = null;

    if (remoteVideo.srcObject) {
      remoteVideo.srcObject.getTracks().forEach((track) => track.stop());
    }

    if (localVideo.srcObject) {
      localVideo.srcObject.getTracks().forEach((track) => track.stop());
    }

    myPeerConnection.close();
    myPeerConnection = null;
  }

  remoteVideo.removeAttribute("src");
  remoteVideo.removeAttribute("srcObject");
  localVideo.removeAttribute("src");
  localVideo.removeAttribute("srcObject");

  document.getElementById("hangup-button").disabled = true;
  targetUsername = null;
}
```

After pulling references to the two `` elements, we check if a WebRTC connection exists; if it does, we proceed to disconnect and close the call:

1. All of the event handlers are removed. This prevents stray event handlers from being triggered while the connection is in the process of closing, potentially causing errors.
2. For both remote and local video streams, we iterate over each track, calling the `MediaStreamTrack.stop()` method to close each one.
3. Close the `RTCPeerConnection` by calling `myPeerConnection.close()`.
4. Set `myPeerConnection` to `null`, ensuring our code learns there's no ongoing call; this is useful when the user clicks a name in the user list.

Then for both the incoming and outgoing `` elements, we remove their `src` and `srcObject` properties using their `removeAttribute()` methods. This completes the disassociation of the streams from the video elements.

Finally, we set the `disabled` property to `true` on the "Hang Up" button, making it unclickable while there is no call underway; then we set `targetUsername` to `null` since we're no longer talking to anyone. This allows the user to call another user, or to receive an incoming call.

#### Dealing with state changes

There are a number of additional events for which you can set listeners to notify your code of a variety of state changes. We use three of them: `iceconnectionstatechange`, `icegatheringstatechange`, and `signalingstatechange`.

##### ICE connection state

`iceconnectionstatechange` events are sent to the `RTCPeerConnection` by the ICE layer when the connection state changes (such as when the call is terminated from the other end).

```js
function handleICEConnectionStateChangeEvent(event) {
  switch (myPeerConnection.iceConnectionState) {
    case "closed":
    case "failed":
      closeVideoCall();
      break;
  }
}
```

Here, we apply our `closeVideoCall()` function when the ICE connection state changes to `"closed"` or `"failed"`. This handles shutting down our end of the connection so that we're ready start or accept a call once again.

> **Note:**
> We don't watch the `disconnected` signaling state here as it can indicate temporary issues and may go back to a `connected` state after some time. Watching it would close the video call on any temporary network issue.

##### ICE signaling state

Similarly, we watch for `signalingstatechange` events. If the signaling state changes to `closed`, we likewise close the call out.

```js
function handleSignalingStateChangeEvent(event) {
  switch (myPeerConnection.signalingState) {
    case "closed":
      closeVideoCall();
      break;
  }
}
```

> **Note:**
> The `closed` signaling state has been deprecated in favor of the `closed` `iceConnectionState`. We are watching for it here to add a bit of backward compatibility.

##### ICE gathering state

`icegatheringstatechange` events are used to let you know when the ICE candidate gathering process state changes. Our example doesn't use this for anything, but it can be useful to watch these events for debugging purposes, as well as to detect when candidate collection has finished.

```js
function handleICEGatheringStateChangeEvent(event) {
  // Our sample just logs information to console here,
  // but you can do whatever you need.
}
```
