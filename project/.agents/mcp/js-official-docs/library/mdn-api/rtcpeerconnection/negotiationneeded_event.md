---
title: "RTCPeerConnection: negotiationneeded event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcpeerconnection/negotiationneeded_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCPeerConnection: negotiationneeded event

A **`negotiationneeded`** event is sent to the `RTCPeerConnection` when negotiation of the connection through the signaling channel is required.
This occurs both during the initial setup of the connection and any time a change to the communication environment requires reconfiguring the connection.

The `negotiationneeded` event is first dispatched to the `RTCPeerConnection` when media is first added to the connection. This starts the process of ICE negotiation by instructing your code to begin exchanging ICE candidates through the signaling server. See Signaling transaction flow for a description of the signaling process that begins with a `negotiationneeded` event.

This event is not cancelable and does not bubble.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("negotiationneeded", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onnegotiationneeded = (event) => { }
```

## Event type

A generic `Event`.

## Examples

In this example, we use `addEventListener()` to create an event handler for `negotiationneeded`. Its role is to create an SDP offer and send it through the signaling channel to the remote peer.

```js
pc.addEventListener("negotiationneeded", (ev) => {
  pc.createOffer()
    .then((offer) => pc.setLocalDescription(offer))
    .then(() =>
      sendSignalingMessage({
        type: "video-offer",
        sdp: pc.localDescription,
      }),
    )
    .catch((err) => {
      // handle error
    });
});
```

After creating the offer, the local end is configured by calling `RTCPeerConnection.setLocalDescription()`; then a signaling message is created and sent to the remote peer through the signaling server, to share that offer with the other peer. The other peer should recognize this message and follow up by creating its own `RTCPeerConnection`, setting the remote description with `setRemoteDescription()`, and then creating an answer to send back to the offering peer.

You can also set an event handler for the `negotiationneeded` event by assigning the event handler function to the `onnegotiationneeded` property (but note that this replaces other event listeners added using `onnegotiationneeded`, if any):

```js
pc.onnegotiationneeded = (ev) => {
  pc.createOffer()
    .then((offer) => pc.setLocalDescription(offer))
    .then(() =>
      sendSignalingMessage({
        type: "video-offer",
        sdp: pc.localDescription,
      }),
    )
    .catch((err) => {
      // handle error
    });
};
```

For a more detailed example, see Starting negotiation.

## See also

- WebRTC API
- Signaling and video calling
- Lifetime of a WebRTC session
- WebRTC connectivity
- Introduction to WebRTC protocols
