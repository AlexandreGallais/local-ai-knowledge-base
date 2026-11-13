---
title: "RTCIceTransport: gatheringState property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcicetransport/gatheringstate/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCIceTransport: gatheringState property

The **`gatheringState`** read-only property of the `RTCIceTransport` interface returns a string that indicates the current gathering state of the ICE agent for this transport: `"new"`, `"gathering"`, or `"complete"`.

You can detect when the value of this property changes by watching for an event of type `gatheringstatechange`.

Note that **`gatheringState`** represents the gathering state of just this transport, while `RTCPeerConnection.iceGatheringState` represents the overall gathering state of the whole connection, including every `RTCIceTransport` used by every `RTCRtpSender` and every `RTCRtpReceiver` on the entire connection.

## Value

A string that indicates the current state of the ICE agent's candidate gathering process:

- `"new"`
    The `RTCIceTransport` is newly created and has not yet started to gather ICE candidates.
- `"gathering"`
    The transport is in the process of gathering candidates.
- `"complete"`
    The transport has finished gathering ICE candidates and has sent the end-of-candidates indicator to the remote device. The transport won't gather any further candidates unless an ICE restart occurs, at which point the gathering process starts over from scratch.
