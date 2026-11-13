---
title: "RTCPeerConnection: iceGatheringState property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcpeerconnection/icegatheringstate/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCPeerConnection: iceGatheringState property

The **`iceGatheringState`** read-only property of the `RTCPeerConnection` interface returns a string that describes the overall ICE gathering state for this connection.
This lets you detect, for example, when collection of ICE candidates has finished.

You can detect when the value of this property changes by watching for an event of type `icegatheringstatechange`.

Note that **`iceGatheringState`** represents the overall gathering state of the connection, including every `RTCIceTransport` used by every `RTCRtpSender` and every `RTCRtpReceiver` on the entire connection.
This contrasts with `RTCIceTransport.gatheringState`, which represents the gathering state for a single transport.

## Value

The possible values are:

- `new`
    The peer connection was just created and hasn't done any networking yet.
- `gathering`
    The ICE agent is in the process of gathering candidates for the connection.
- `complete`
    The ICE agent has finished gathering candidates.
    If something happens that requires collecting new candidates, such as a new interface being added or the addition of a new ICE server, the state will revert to `gathering` to gather those candidates.

## Example

```js
const pc = new RTCPeerConnection();
const state = pc.iceGatheringState;
```

## See also

- `icegatheringstatechange`
- WebRTC
