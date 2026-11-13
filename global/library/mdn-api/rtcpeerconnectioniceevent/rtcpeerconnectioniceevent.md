---
title: "RTCPeerConnectionIceEvent: RTCPeerConnectionIceEvent() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcpeerconnectioniceevent/rtcpeerconnectioniceevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCPeerConnectionIceEvent: RTCPeerConnectionIceEvent() constructor

The **`RTCPeerConnectionIceEvent()`** constructor creates a new
`RTCPeerConnectionIceEvent` object.

## Syntax

```js
new RTCPeerConnectionIceEvent(type, options)
```

### Parameters

- `type`
    A string with the name of the event.
    It is case-sensitive and browsers always set it to `icecandidate`.
- `options` (optional)
    An object that, _in addition of the properties defined in `Event()`_, can have the following properties:
    - `candidate`
        A `RTCIceCandidate` representing the ICE candidate being concerned by the event.
        If `null`, the event indicates the end of candidate gathering.
    - `url`
        A string containing the URL of the STUN or TURN server which was used to gather the candidate.
        If the candidate was not gathered by a STUN or TURN server,
        this value must be `null`, which is also the default value.

### Return value

A new `RTCPeerConnectionIceEvent` object, configured as specified in the provided options.

## See also

- WebRTC
- Its usual target: `RTCPeerConnection`.
