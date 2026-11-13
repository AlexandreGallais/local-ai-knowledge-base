---
title: "RTCPeerConnection: signalingstatechange event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcpeerconnection/signalingstatechange_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCPeerConnection: signalingstatechange event

A **`signalingstatechange`** event is sent to an `RTCPeerConnection` to notify it that its signaling state, as indicated by the `signalingState` property, has changed.

This event is not cancelable and does not bubble.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("signalingstatechange", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onsignalingstatechange = (event) => { }
```

## Event type

A generic `Event`.

## Examples

Given an `RTCPeerConnection`, `pc`, and an `updateStatus()` function that presents status information to the user, this code sets up an event handler to let the user know when the ICE negotiation process finishes up.

```js
pc.addEventListener("signalingstatechange", (ev) => {
  switch (pc.signalingState) {
    case "stable":
      updateStatus("ICE negotiation complete");
      break;
  }
});
```

Using `onsignalingstatechange`, it looks like this (but note that this replaces other event listeners added using `onsignalingstatechange`, if any):

```js
pc.onsignalingstatechange = (ev) => {
  switch (pc.signalingState) {
    case "stable":
      updateStatus("ICE negotiation complete");
      break;
  }
};
```

## See also

- WebRTC API
- `RTCPeerConnection.signalingState`
