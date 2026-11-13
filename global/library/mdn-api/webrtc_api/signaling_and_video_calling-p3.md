---
title: "Signaling and video calling (part 3 of 5)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webrtc_api/signaling_and_video_calling/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Signaling and video calling (part 3 of 5)

### The JavaScript code

We'll divide this code into functional areas to more easily describe how it works. The main body of this code is found in the `connect()` function: it opens up a `WebSocket` server on port 6503, and establishes a handler to receive messages in JSON object format. This code generally handles text chat messages as it did previously.

#### Sending messages to the signaling server

Throughout our code, we call `sendToServer()` in order to send messages to the signaling server. This function uses the WebSocket connection to do its work:

```js
function sendToServer(msg) {
  const msgJSON = JSON.stringify(msg);

  connection.send(msgJSON);
}
```

The message object passed into this function is converted into a JSON string by calling `JSON.stringify()`, then we call the WebSocket connection's `send()` function to transmit the message to the server.

#### UI to start a call

The code which handles the `"user-list"` message calls `handleUserListMsg()`. Here we set up the handler for each connected user in the user list displayed to the left of the chat panel. This function receives a message object whose `users` property is an array of strings specifying the user names of every connected user.

```js
function handleUserListMsg(msg) {
  const listElem = document.querySelector(".user-list-box");

  while (listElem.firstChild) {
    listElem.removeChild(listElem.firstChild);
  }

  msg.users.forEach((username) => {
    const item = document.createElement("li");
    item.appendChild(document.createTextNode(username));
    item.addEventListener("click", invite);

    listElem.appendChild(item);
  });
}
```

After getting a reference to the `` which contains the list of user names into the variable `listElem`, we empty the list by removing each of its child elements.

> **Note:**
> Obviously, it would be more efficient to update the list by adding and removing individual users instead of rebuilding the whole list every time it changes, but this is good enough for the purposes of this example.

Then we iterate over the array of user names using `forEach()`. For each name, we create a new `` element, then create a new text node containing the user name using `createTextNode()`. That text node is added as a child of the `` element. Next, we set a handler for the `click` event on the list item, that clicking on a user name calls our `invite()` method, which we'll look at in the next section.

Finally, we append the new item to the `` that contains all of the user names.

#### Starting a call

When the user clicks on a username they want to call, the `invite()` function is invoked as the event handler for that `click` event:

```js
const mediaConstraints = {
  audio: true, // We want an audio track
  video: true, // And we want a video track
};

function invite(evt) {
  if (myPeerConnection) {
    alert("You can't start a call because you already have one open!");
  } else {
    const clickedUsername = evt.target.textContent;

    if (clickedUsername === myUsername) {
      alert(
        "I'm afraid I can't let you talk to yourself. That would be weird.",
      );
      return;
    }

    targetUsername = clickedUsername;
    createPeerConnection();

    navigator.mediaDevices
      .getUserMedia(mediaConstraints)
      .then((localStream) => {
        document.getElementById("local_video").srcObject = localStream;
        localStream
          .getTracks()
          .forEach((track) => myPeerConnection.addTrack(track, localStream));
      })
      .catch(handleGetUserMediaError);
  }
}
```

This begins with a basic <example-value> check: is the user already connected? If there's already a `RTCPeerConnection`, they obviously can't make a call. Then the name of the user that was clicked upon is obtained from the event target's `textContent` property, and we check to be sure that it's not the same user that's trying to start the call.

Then we copy the name of the user we're calling into the variable `targetUsername` and call `createPeerConnection()`, a function which will create and do basic <example-value> of the `RTCPeerConnection`.

Once the `RTCPeerConnection` has been created, we request access to the user's camera and microphone by calling `MediaDevices.getUserMedia()`, which is exposed to us through the `MediaDevices.getUserMedia` property. When this succeeds, fulfilling the returned promise, our `then` handler is executed. It receives, as input, a `MediaStream` object representing the stream with audio from the user's microphone and video from their webcam.

> **Note:**
> We could restrict the set of permitted media inputs to a specific device or set of devices by calling `navigator.mediaDevices.enumerateDevices()` to get a list of devices, filtering the resulting list based on our desired criteria, then using the selected devices' `deviceId` values in the `deviceId` field of the `mediaConstraints` object passed into `getUserMedia()`. In practice, this is rarely if ever necessary, since most of that work is done for you by `getUserMedia()`.

We attach the incoming stream to the local preview `` element by setting the element's `srcObject` property. Since the element is configured to automatically play incoming video, the stream begins playing in our local preview box.

We then iterate over the tracks in the stream, calling `addTrack()` to add each track to the `RTCPeerConnection`. Even though the connection is not fully established yet, you can begin sending data when you feel it's appropriate to do so. Media received before the ICE negotiation is completed may be used to help ICE decide upon the best connectivity approach to take, thus aiding in the negotiation process.

Note that for native apps, such as a phone application, you should not begin sending until the connection has been accepted at both ends, at a minimum, to avoid inadvertently sending video and/or audio data when the user isn't prepared for it.

As soon as media is attached to the `RTCPeerConnection`, a `negotiationneeded` event is triggered at the connection, so that ICE negotiation can be started.

If an error occurs while trying to get the local media stream, our catch clause calls `handleGetUserMediaError()`, which displays an appropriate error to the user as required.

#### Handling getUserMedia() errors

If the promise returned by `getUserMedia()` concludes in a failure, our `handleGetUserMediaError()` function performs.

```js
function handleGetUserMediaError(e) {
  switch (e.name) {
    case "NotFoundError":
      alert(
        "Unable to open your call because no camera and/or microphone" +
          "were found.",
      );
      break;
    case "SecurityError":
    case "PermissionDeniedError":
      // Do nothing; this is the same as the user canceling the call.
      break;
    default:
      alert(`Error opening your camera and/or microphone: ${e.message}`);
      break;
  }

  closeVideoCall();
}
```

An error message is displayed in all cases but one. In this example, we ignore `"SecurityError"` and `"PermissionDeniedError"` results, treating refusal to grant permission to use the media hardware the same as the user canceling the call.

Regardless of why an attempt to get the stream fails, we call our `closeVideoCall()` function to shut down the `RTCPeerConnection`, and release any resources already allocated by the process of attempting the call. This code is designed to safely handle partially-started calls.

#### Creating the peer connection

The `createPeerConnection()` function is used by both the caller and the callee to construct their `RTCPeerConnection` objects, their respective ends of the WebRTC connection. It's invoked by `invite()` when the caller tries to start a call, and by `handleVideoOfferMsg()` when the callee receives an offer message from the caller.

```js
function createPeerConnection() {
  myPeerConnection = new RTCPeerConnection({
    iceServers: [
      // Information about ICE servers - Use your own!
      {
        urls: "stun:stun.stunprotocol.org",
      },
    ],
  });

  myPeerConnection.onicecandidate = handleICECandidateEvent;
  myPeerConnection.ontrack = handleTrackEvent;
  myPeerConnection.onnegotiationneeded = handleNegotiationNeededEvent;
  myPeerConnection.onremovetrack = handleRemoveTrackEvent;
  myPeerConnection.oniceconnectionstatechange =
    handleICEConnectionStateChangeEvent;
  myPeerConnection.onicegatheringstatechange =
    handleICEGatheringStateChangeEvent;
  myPeerConnection.onsignalingstatechange = handleSignalingStateChangeEvent;
}
```

When using the `RTCPeerConnection()` constructor, we will specify an object providing configuration parameters for the connection. We use only one of these in this example: `iceServers`. This is an array of objects describing STUN and/or TURN servers for the ICE layer to use when attempting to establish a route between the caller and the callee. These servers are used to determine the best route and protocols to use when communicating between the peers, even if they're behind a firewall or using NAT.

> **Note:**
> You should always use STUN/TURN servers which you own, or which you have specific authorization to use. This example is using a known public STUN server but abusing these is bad form.

Each object in `iceServers` contains at least a `urls` field providing URLs at which the specified server can be reached. It may also provide `username` and `credential` values to allow authentication to take place, if needed.

After creating the `RTCPeerConnection`, we set up handlers for the events that matter to us.

The first three of these event handlers are required; you have to handle them to do anything involving streamed media with WebRTC. The rest aren't strictly required but can be useful, and we'll explore them. There are a few other events available that we're not using in this example, as well. Here's a summary of each of the event handlers we will be implementing:

- `onicecandidate`
    The local ICE layer calls your `icecandidate` event handler, when it needs you to transmit an ICE candidate to the other peer, through your signaling server. See Sending ICE candidates for more information and to see the code for this example.
- `ontrack`
    This handler for the `track` event is called by the local WebRTC layer when a track is added to the connection. This lets you connect the incoming media to an element to display it, for example. See Receiving new streams for details.
- `onnegotiationneeded`
    This function is called whenever the WebRTC infrastructure needs you to start the session negotiation process anew. Its job is to create and send an offer, to the callee, asking it to connect with us. See Starting negotiation to see how we handle this.
- `onremovetrack`
    This counterpart to `ontrack` is called to handle the `removetrack` event; it's sent to the `RTCPeerConnection` when the remote peer removes a track from the media being sent. See Handling the removal of tracks.
- `oniceconnectionstatechange`
    The `iceconnectionstatechange` event is sent by the ICE layer to let you know about changes to the state of the ICE connection. This can help you know when the connection has failed, or been lost. We'll look at the code for this example in ICE connection state below.
- `onicegatheringstatechange`
    The ICE layer sends you the `icegatheringstatechange` event, when the ICE agent's process of collecting candidates shifts, from one state to another (such as starting to gather candidates or completing negotiation). See ICE gathering state below.
- `onsignalingstatechange`
    The WebRTC infrastructure sends you the `signalingstatechange` message when the state of the signaling process changes (or if the connection to the signaling server changes). See Signaling state to see our code.

#### Starting negotiation

Once the caller has created its `RTCPeerConnection`, created a media stream, and added its tracks to the connection as shown in Starting a call, the browser will deliver a `negotiationneeded` event to the `RTCPeerConnection` to indicate that it's ready to begin negotiation with the other peer. Here's our code for handling the `negotiationneeded` event:

```js
function handleNegotiationNeededEvent() {
  myPeerConnection
    .createOffer()
    .then((offer) => myPeerConnection.setLocalDescription(offer))
    .then(() => {
      sendToServer({
        name: myUsername,
        target: targetUsername,
        type: "video-offer",
        sdp: myPeerConnection.localDescription,
      });
    })
    .catch(window.reportError);
}
```

To start the negotiation process, we need to create and send an SDP offer to the peer we want to connect to. This offer includes a list of supported configurations for the connection, including information about the media stream we've added to the connection locally (that is, the video we want to send to the other end of the call), and any ICE candidates gathered by the ICE layer already. We create this offer by calling `myPeerConnection.createOffer()`.

When `createOffer()` succeeds (fulfilling the promise), we pass the created offer information into `myPeerConnection.setLocalDescription()`, which configures the connection and media configuration state for the caller's end of the connection.

> **Note:**
> Technically speaking, the string returned by `createOffer()` is an  offer.

We know the description is valid, and has been set, when the promise returned by `setLocalDescription()` is fulfilled. This is when we send our offer to the other peer by creating a new `"video-offer"` message containing the local description (now the same as the offer), then sending it through our signaling server to the callee. The offer has the following members:

- `type`
    The message type: `"video-offer"`.
- `name`
    The caller's username.
- `target`
    The name of the user we wish to call.
- `sdp`
    The SDP string describing the offer.

If an error occurs, either in the initial `createOffer()` or in any of the fulfillment handlers that follow, an error is reported by invoking our `window.reportError()` function.

Once `setLocalDescription()`'s fulfillment handler has run, the ICE agent begins sending `icecandidate` events to the `RTCPeerConnection`, one for each potential configuration it discovers. Our handler for the `icecandidate` event is responsible for transmitting the candidates to the other peer.

#### Session negotiation

Now that we've started negotiation with the other peer and have transmitted an offer, let's look at what happens on the callee's side of the connection for a while. The callee receives the offer and calls `handleVideoOfferMsg()` function to process it. Let's see how the callee handles the `"video-offer"` message.

##### Handling the invitation
