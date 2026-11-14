---
title: "RTCInboundRtpStreamStats: packetsLost property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcinboundrtpstreamstats/packetslost/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCInboundRtpStreamStats: packetsLost property

The **`packetsLost`** property of the `RTCRemoteInboundRtpStreamStats` dictionary returns the total number of RTP packets lost from the synchronization source (SSRC) since the beginning of reception.

Note that this can be negative.

## Value

An integer value.

The value is determined by subtracting the number of packets received from the number of packets that are expected.
The number of packets that are expected is calculated in a way that assumes that all packets only need to be sent once (based on sequence numbers), while the number of packets received also includes any packets that had to be resent (and hence may be bigger).
For more information see the "cumulative number of packets lost" section in 3550.

## See also

- `RTCInboundRtpStreamStats.ssrc`
- `RTCRemoteInboundRtpStreamStats.packetsLost`
- `packetsDiscarded`
