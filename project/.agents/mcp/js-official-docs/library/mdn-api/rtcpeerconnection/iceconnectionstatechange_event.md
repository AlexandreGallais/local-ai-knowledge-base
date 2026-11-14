---
title: "RTCPeerConnection: iceconnectionstatechange event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcpeerconnection/iceconnectionstatechange_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCPeerConnection: iceconnectionstatechange event

An **`iceconnectionstatechange`** event is sent to an `RTCPeerConnection` object each time the ICE connection state changes during the negotiation process.
The new ICE connection state is available in the object's `iceConnectionState` property.

One common task performed by the `iceconnectionstatechange` event listener is to trigger ICE restart when the state changes to `failed`.

This event is not cancelable and does not bubble.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("iceconnectionstatechange", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
oniceconnectionstatechange = (event) => { }
```

## Event type

A generic `Event`.

## Usage notes

A successful connection attempt will typically involve the state starting at `new`, then transitioning through `checking`, then `connected`, and finally `completed`. However, under certain circumstances, the `connected` state can be skipped, causing a connection to transition directly from the `checking` state to `completed`. This can happen when only the last checked candidate is successful, and the gathering and end-of-candidates signals both occur before the successful negotiation is completed.

### ICE connection state during ICE restarts

When an ICE restart is processed, the gathering and connectivity checking process is started over from the beginning, which will cause the `iceConnectionState` to transition to `connected` if the ICE restart was triggered while in the `completed` state. If ICE restart is initiated while in the transient `disconnected` state, the state transitions instead to `checking`, essentially indicating that the negotiation is ignoring the fact that the connection had been temporarily lost.

### State transitions as negotiation ends

When the negotiation process runs out of candidates to check, the ICE connection transitions to one of two states. If no suitable candidates were found, the state transitions to `failed`. If at least one suitable candidate was successfully identified, the state transitions to `completed`. The ICE layer makes this determination upon receiving the end-of-candidates signal, which is provided by calling `addIceCandidate()` with a candidate whose `candidate` property is an empty string (""), or by setting the `RTCPeerConnection` property `canTrickleIceCandidates` to `false`.

## Examples

An event handler for this event can be added using the `oniceconnectionstatechange` property (but note that this replaces other event listeners added using `oniceconnectionstatechange`, if any) or by using `addEventListener()` on the `RTCPeerConnection`.

In this example, a handler for `iceconnectionstatechange` is set up to update a call state indicator by using the value of `iceConnectionState` to create a string which corresponds to the name of a CSS class that we can assign to the status indicator to cause it to reflect the current state of the connection.

```js
pc.addEventListener("iceconnectionstatechange", (ev) => {
  let stateElem = document.querySelector("#call-state");
  stateElem.className = `${pc.iceConnectionState}-state`;
});
```

This can also be written using the `oniceconnectionstatechange` event handler property (but note that this replaces other event listeners added using `oniceconnectionstatechange`, if any):

```js
pc.oniceconnectionstatechange = (ev) => {
  let stateElem = document.querySelector("#call-state");
  stateElem.className = `${pc.iceConnectionState}-state`;
};
```

## See also

- WebRTC API
- `RTCPeerConnection`
- `RTCPeerConnection.iceConnectionState`
