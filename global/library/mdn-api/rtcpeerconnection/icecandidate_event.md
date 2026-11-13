---
title: "RTCPeerConnection: icecandidate event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcpeerconnection/icecandidate_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCPeerConnection: icecandidate event

An **`icecandidate`** event is sent to an `RTCPeerConnection` when:

- An `RTCIceCandidate` has been identified and added to the local peer by a call to `RTCPeerConnection.setLocalDescription()`,
- Every `RTCIceCandidate` correlated with a particular username fragment and password <example-value> (a **generation**) has been so identified and added, and
- All ICE gathering on all transports is complete.

In the first two cases, the event handler should transmit the candidate to the remote peer over the signaling channel so the remote peer can add it to its set of remote candidates.

This event is not cancelable and does not bubble.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("icecandidate", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onicecandidate = (event) => { }
```

## Event type

An `RTCPeerConnectionIceEvent`. Inherits from `Event`.

## Description

There are three reasons why the `icecandidate` event is fired on an `RTCPeerConnection`.

### Sharing a new candidate

The majority of `icecandidate` events are fired to indicate that a new candidate has been gathered. This candidate needs to be delivered to the remote peer over the signaling channel your code manages.

```js
rtcPeerConnection.onicecandidate = (event) => {
  if (event.candidate !== null) {
    sendCandidateToRemotePeer(event.candidate);
  } else {
    /* there are no more candidates coming during this negotiation */
  }
};
```

The remote peer, upon receiving the candidate, will add the candidate to its candidate pool by calling `addIceCandidate()`, passing in the `candidate` string you have passed along using the signaling server.

### Indicating the end of a generation of candidates

When an ICE negotiation session runs out of candidates to propose for a given `RTCIceTransport`, it has completed gathering for a **generation** of candidates. That this has occurred is indicated by an `icecandidate` event whose `candidate` string is empty (`""`).

You should deliver this to the remote peer just like any standard candidate, as described under Sharing a new candidate above. This ensures that the remote peer is given the end-of-candidates notification as well. As you see in the code in the previous section, every candidate is sent to the other peer, including any that might have an empty candidate string. Only candidates for which the event's `candidate` property is `null` are not forwarded across the signaling connection.

The end-of-candidates indication is described in section 9.3 of the Trickle ICE draft specification (note that the section number is subject to change as the specification goes through repeated drafts).

### Indicating that ICE gathering is complete

Once all ICE transports have finished gathering candidates and the value of the `RTCPeerConnection` object's `iceGatheringState` has made the transition to `complete`, an `icecandidate` event is sent with the value of `candidate` set to `null`.

This signal exists for backward compatibility purposes and does _not_ need to be delivered onward to the remote peer (which is why the code snippet above checks to see if `event.candidate` is `null` prior to sending the candidate along).

If you need to perform any special actions when there are no further candidates expected, you're much better off watching the ICE gathering state by watching for `icegatheringstatechange` events:

```js
pc.addEventListener("icegatheringstatechange", (ev) => {
  switch (pc.iceGatheringState) {
    case "new":
      /* gathering is either just starting or has been reset */
      break;
    case "gathering":
      /* gathering has begun or is ongoing */
      break;
    case "complete":
      /* gathering has ended */
      break;
  }
});
```

As you can see in this example, the `icegatheringstatechange` event lets you know when the value of the `RTCPeerConnection` property `iceGatheringState` has been updated. If that value is now `complete`, you know that ICE gathering has just ended.

This is a more reliable approach than looking at the individual ICE messages for one indicating that the ICE session is finished.

## Examples

This example creates a simple handler for the `icecandidate` event that uses a function called `sendMessage()` to create and send a reply to the remote peer through the signaling server.

First, an example using `addEventListener()`:

```js
pc.addEventListener("icecandidate", (ev) => {
  if (ev.candidate !== null) {
    sendMessage({
      type: "new-ice-candidate",
      candidate: ev.candidate,
    });
  }
});
```

You can also set the `onicecandidate` event handler property directly (but note that this replaces other event listeners added using `onicecandidate`, if any):

```js
pc.onicecandidate = (ev) => {
  if (ev.candidate !== null) {
    sendMessage({
      type: "new-ice-candidate",
      candidate: ev.candidate,
    });
  }
};
```

## See also

- WebRTC API
- Signaling and video calling
