---
title: "RTCPeerConnectionIceEvent"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcpeerconnectioniceevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCPeerConnectionIceEvent

The **`RTCPeerConnectionIceEvent`** interface represents events that occur in relation to ICE candidates with the target, usually an `RTCPeerConnection`.

Only one event is of this type: `icecandidate`.

## Constructors

- `RTCPeerConnectionIceEvent()`
    Returns a new `RTCPeerConnectionIceEvent`. It takes two parameters, the first being a string representing the type of the event; the second a dictionary containing the `RTCIceCandidate` it refers to.

## Instance properties

_A `RTCPeerConnectionIceEvent` being an `Event`, this event also implements these properties_.

- `RTCPeerConnectionIceEvent.candidate` (read-only)
    Contains the `RTCIceCandidate` containing the candidate associated with the event, or `null` if this event indicates that there are no further candidates to come.
- `RTCPeerConnectionIceEvent.url` (read-only) (deprecated)
    Contains a string indicating the URL of the STUN or TURN server used to gather the candidate, or `null` if the candidate was not gathered from a server.

## Instance methods

_A `RTCPeerConnectionIceEvent` being an `Event`, this event also implements these properties. There is no specific `RTCDataChannelEvent` method._

## Examples

```js
pc.onicecandidate = (ev) => {
  console.log(
    `The ICE candidate ('${ev.candidate.candidate}') added to connection.`,
  );
};
```

## See also

- WebRTC
- Its usual target: `RTCPeerConnection`.
