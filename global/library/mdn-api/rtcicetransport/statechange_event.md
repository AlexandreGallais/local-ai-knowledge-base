---
title: "RTCIceTransport: statechange event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcicetransport/statechange_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCIceTransport: statechange event

A **`statechange`** event occurs when the `RTCIceTransport` changes state. The `state` can be used to determine how far through the process of examining, verifying, and selecting a valid candidate pair is prior to successfully connecting the two peers for WebRTC communications.

This event is not cancelable and does not bubble.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("statechange", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onstatechange = (event) => { }
```

## Event type

A generic `Event`.

## Examples

Given an `RTCPeerConnection`, `pc`, the following code creates an event handler that calls a function named `handleFailure()` if the ICE transport enters a failure state.

```js
let iceTransport = pc.getSenders()[0].transport.iceTransport;

iceTransport.addEventListener("statechange", (ev) => {
  if (iceTransport.state === "failed") {
    handleFailure(pc);
  }
});
```

The same code, using the `onstatechange` event handler property, looks like this (but note that this replaces other event listeners added using `onstatechange`, if any):

```js
let iceTransport = pc.getSenders()[0].transport.iceTransport;

iceTransport.onstatechange = (ev) => {
  if (iceTransport.state === "failed") {
    handleFailure(pc);
  }
};
```

## See also

- WebRTC API
- WebRTC connectivity

### Related RTCIceTransport events

- `gatheringstatechange`
- `selectedcandidatepairchange`

### Related RTCPeerConnection events

- `negotiationneeded`
- `signalingstatechange`
- `iceconnectionstatechange`
- `icegatheringstatechange`
- `connectionstatechange`
