---
title: "RTCIceTransport: selectedcandidatepairchange event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcicetransport/selectedcandidatepairchange_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCIceTransport: selectedcandidatepairchange event

A **`selectedcandidatepairchange`** event is sent to an `RTCIceTransport` when the ICE agent selects a new pair of candidates that describe the endpoints of a viable connection.

The pair of candidates is in turn described by an `RTCIceCandidatePair` object which contains one `RTCIceCandidate` representing the local end of the connection, and another representing the remote end of the connection.

Together, the candidates can be used to establish a connection to be used by the `RTCIceTransport`, and, by extension, by an `RTCPeerConnection`.

This event is not cancelable and does not bubble.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("selectedcandidatepairchange", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onselectedcandidatepairchange = (event) => { }
```

## Event type

A generic `Event`.

## Examples

This example creates an event handler for `selectedcandidatepairchange` that updates a display providing the user information about the progress of the ICE negotiation for an `RTCPeerConnection` called `pc`.

```js
let iceTransport = pc.getSenders()[0].transport.iceTransport;
let localProtoElem = document.getElementById("local-protocol");
let remoteProtoElem = document.getElementById("remote-protocol");

iceTransport.addEventListener("selectedcandidatepairchange", (ev) => {
  let pair = iceTransport.getSelectedCandidatePair();
  localProtoElem.innerText = pair.local.protocol.toUpperCase();
  remoteProtoElem.innerText = pair.remote.protocol.toUpperCase();
});
```

This can also be done by setting the `onselectedcandidatepairchange` event handler property directly (but note that this replaces other event listeners added using `onselectedcandidatepairchange`, if any).

```js
let iceTransport = pc.getSenders()[0].transport.iceTransport;
let localProtoElem = document.getElementById("local-protocol");
let remoteProtoElem = document.getElementById("remote-protocol");

iceTransport.onselectedcandidatepairchange = (ev) => {
  let pair = iceTransport.getSelectedCandidatePair();
  localProtoElem.innerText = pair.local.protocol.toUpperCase();
  remoteProtoElem.innerText = pair.remote.protocol.toUpperCase();
};
```

## See also

- WebRTC API
- WebRTC connectivity

### Related RTCIceTransport events

- `statechange`
- `gatheringstatechange`

### Related RTCPeerConnection events

- `negotiationneeded`
- `signalingstatechange`
- `iceconnectionstatechange`
- `icegatheringstatechange`
- `connectionstatechange`
