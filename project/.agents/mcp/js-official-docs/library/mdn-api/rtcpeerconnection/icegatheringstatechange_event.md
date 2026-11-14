---
title: "RTCPeerConnection: icegatheringstatechange event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcpeerconnection/icegatheringstatechange_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCPeerConnection: icegatheringstatechange event

The **`icegatheringstatechange`** event is sent to the `onicegatheringstatechange` event handler on an `RTCPeerConnection` when the state of the ICE candidate gathering process changes.
This signifies that the value of the connection's `iceGatheringState` property has changed.

When ICE first starts to gather connection candidates, the value changes from `new` to `gathering` to indicate that the process of collecting candidate configurations for the connection has begun. When the value changes to `complete`, all of the transports that make up the `RTCPeerConnection` have finished gathering ICE candidates.

> **Note:**
> While you can determine that ICE candidate gathering is complete by watching for `icegatheringstatechange` events and checking for the value of `iceGatheringState` to become `complete`, you can also have your handler for the `icecandidate` event look to see if its `candidate` property is `null`. This also indicates that collection of candidates is finished.

This event is not cancelable and does not bubble.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("icegatheringstatechange", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onicegatheringstatechange = (event) => { }
```

## Event type

A generic `Event`.

## Examples

This example creates a handler for `icegatheringstatechange` events using the `onicegatheringstatechange` property (but note that this replaces other event listeners added using `onicegatheringstatechange`, if any).

```js
pc.onicegatheringstatechange = (ev) => {
  let connection = ev.target;

  switch (connection.iceGatheringState) {
    case "gathering":
      /* collection of candidates has begun */
      break;
    case "complete":
      /* collection of candidates is finished */
      break;
  }
};
```

Likewise, you can use `addEventListener()` to add a listener for `icegatheringstatechange` events:

```js
pc.addEventListener("icegatheringstatechange", (ev) => {
  let connection = ev.target;

  switch (connection.iceGatheringState) {
    case "gathering":
      // collection of candidates has begun
      break;
    case "complete":
      // collection of candidates is finished
      break;
  }
});
```

## See also

- WebRTC API
- Signaling and video calling
- WebRTC connectivity
- Lifetime of a WebRTC session
