---
title: "RTCIceCandidatePairStats: lastPacketReceivedTimestamp property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcicecandidatepairstats/lastpacketreceivedtimestamp/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCIceCandidatePairStats: lastPacketReceivedTimestamp property

The **`lastPacketReceivedTimestamp`** property of the `RTCIceCandidatePairStats` dictionary indicates the time at which the connection described by the candidate pair last received a packet.

STUN packets are not included.

## Value

A `DOMHighResTimeStamp` object indicating the timestamp at which the connection described by pair of candidates last received a packet, STUN packets excluded.
