---
title: "RTCIceCandidatePairStats: nominated property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcicecandidatepairstats/nominated/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCIceCandidatePairStats: nominated property

The **`nominated`** property of the `RTCIceCandidatePairStats` dictionary specifies whether or not the candidate pair described by the underlying `RTCIceCandidatePair` has been nominated to be used as the configuration for the WebRTC connection.

## Value

A Boolean value which is set to `true` by the ICE layer if the controlling user agent has indicated that the candidate pair should be used to configure the WebRTC connection between the two peers.

> **Note:**
> If more than one candidate pair are nominated at the same time, the one whose priority is higher will be selected for use.

Once a candidate pair has been nominated and the two peers have each reconfigured themselves to use the specified configuration, the ICE negotiation process can potentially end (or it can continue, to allow the connection to adapt to changing conditions).
