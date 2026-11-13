---
title: "RTCIceTransport: gatheringstatechange event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcicetransport/gatheringstatechange_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCIceTransport: gatheringstatechange event

A **`gatheringstatechange`** event is sent to an `RTCIceTransport` when its ICE candidate gathering state changes.

The gathering state, whose actual status can be found in the transport object's `gatheringState` property, indicates whether or not the ICE agent has begun gathering candidates on this transport, and if so, if it has finished doing so.

This event is not cancelable and does not bubble.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("gatheringstatechange", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
ongatheringstatechange = (event) => { }
```

## Event type

A generic `Event`.

## Examples

This example creates a handler for `gatheringstatechange` events on each `RTCRtpSender` associated with a given `RTCPeerConnection`. Here, the `addEventListener()` method is called to add a listener for `gatheringstatechange` events:

```js
pc.getSenders().forEach((sender) => {
  sender.transport.iceTransport.addEventListener(
    "gatheringstatechange",
    (ev) => {
      let transport = ev.target;

      if (transport.gatheringState === "complete") {
        /* this transport has finished gathering candidates,
        but others may still be working on it */
      }
    },
  );
});
```

Likewise, you can use the `ongatheringstatechange` event handler property (but note that this replaces other event listeners added using `ongatheringstatechange`, if any):

```js
pc.getSenders().forEach((sender) => {
  sender.transport.iceTransport.ongatheringstatechange = (ev) => {
    let transport = ev.target;

    if (transport.gatheringState === "complete") {
      /* this transport has finished gathering candidates,
         but others may still be working on it */
    }
  };
});
```

## See also

- WebRTC API
- WebRTC connectivity

### Related RTCIceTransport events

- `statechange`
- `selectedcandidatepairchange`

### Related RTCPeerConnection events

- `negotiationneeded`
- `signalingstatechange`
- `iceconnectionstatechange`
- `icegatheringstatechange`
- `connectionstatechange`
