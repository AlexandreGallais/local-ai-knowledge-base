---
title: "RTCIceCandidateStats: protocol property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcicecandidatestats/protocol/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCIceCandidateStats: protocol property

The **`protocol`** property of the `RTCIceCandidateStats` dictionary indicates the protocol the specified candidate would use for communication with the remote peer.

## Value

The value is one of the following strings:

- `tcp`
    The candidate, if selected, would use TCP as the transport protocol for its data.
    The `tcpType` property provides additional information about the kind of TCP candidate represented by the object.
- `udp`
    The candidate will use the UDP transport protocol for its data.
    This is the preferred protocol for media interactions because of its better performance profile.
