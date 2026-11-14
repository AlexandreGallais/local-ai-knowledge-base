---
title: "RTCRemoteOutboundRtpStreamStats: remoteTimestamp property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcremoteoutboundrtpstreamstats/remotetimestamp/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCRemoteOutboundRtpStreamStats: remoteTimestamp property

The `RTCRemoteOutboundRtpStreamStats` property **`remoteTimestamp`** indicates the timestamp on the remote peer at which these statistics were sent.
This differs from `timestamp`, which indicates the time at which the statistics were generated or received locally.

## Value

A `DOMHighResTimeStamp` value indicating the timestamp on the remote peer at which it sent these statistics.
This is different from the value `timestamp`, which gives the time at which the statistics were generated or received by the local peer.

If this property is present, it comes from the RTCP Sender Report (SR) block, which reflects the clock on the remote peer at the time the message was sent.
Keep in mind that this means the clock may not be synchronized with the local clock, and that both the current time and the pace at which the clock runs may differ to some extent.
