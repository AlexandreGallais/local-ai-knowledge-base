---
title: "RTCInboundRtpStreamStats: headerBytesReceived property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcinboundrtpstreamstats/headerbytesreceived/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCInboundRtpStreamStats: headerBytesReceived property

The **`headerBytesReceived`** property of the `RTCInboundRtpStreamStats` dictionary indicates the total number of RTP header and padding bytes received for this synchronization source (SSRC), including those sent in retransmissions.

Note that the total number of bytes received as payload over the transport is equal to: `headerBytesReceived` + `bytesReceived`.

## Value

A positive integer.
