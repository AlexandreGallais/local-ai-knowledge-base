---
title: "RTCRemoteInboundRtpStreamStats: localId property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcremoteinboundrtpstreamstats/localid/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCRemoteInboundRtpStreamStats: localId property

The `RTCRemoteInboundRtpStreamStats` dictionary's **`localId`** property is a string that can be used to identify the `RTCOutboundRtpStreamStats` object whose `remoteId` matches this value.

Together, these two objects provide statistics about the inbound and outbound sides of the same synchronization source (SSRC).

## Value

A string which can be compared to the value of an `RTCOutboundRtpStreamStats` object's `remoteId` property to see if the two represent statistics for each of the two sides of the same set of data sent by the local peer.

## Usage notes

You can think of the local and remote views of the same RTP stream as pairs, each of which has a reference back to the other one.
Thus, if an `RTCStatsReport` includes a `remote-inbound-rtp` statistics object (of type `RTCRemoteInboundRtpStreamStats`), it should also have a corresponding `outbound-rtp` object.

Both of these provide information about the same batch of packets being sent from the local device to the remote peer.
The difference is that `outbound-rtp` offers statistics about the outgoing data from the local peer's perspective, while `remote-inbound-rtp` provides statistics about the same data from the perspective of the remote peer, as it is received.

## Examples

See the example in `RTCRemoteOutboundRtpStreamStats.localId`.
This shows how to correlate statistics about data sent from the remote peer (from the perspective of the remote peer) with the incoming data from the perspective of the local peer.

The code to correlate send data from the perspective of the local peer and received data from the perspective of the remote peer would be almost the same, and can be inferred from that example.
