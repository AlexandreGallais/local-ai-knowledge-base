---
title: "RTCIceCandidateStats: relayProtocol property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcicecandidatestats/relayprotocol/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCIceCandidateStats: relayProtocol property

The `RTCIceCandidateStats` dictionary's
**`relayProtocol`** property specifies the protocol being used
by a local ICE candidate to communicate with the TURN
server.

The ICE protocol being used by the candidate otherwise can be obtained from the
`protocol` property.

## Value

A string identifying the protocol being used by the endpoint to
communicate with the TURN server. The possible values are:

- `tcp`
    TCP (Transport Control Protocol) is being used to communicate with the TURN server.
- `tls`
    TLS (Transport Layer Security) is being used to communicate with the TURN server.
- `udp`
    UDP (User Datagram Protocol) is being used to communicate with the TURN server.

> **Note:**
> This property is only present on
> `RTCIceCandidateStats` objects that represent local candidates.
