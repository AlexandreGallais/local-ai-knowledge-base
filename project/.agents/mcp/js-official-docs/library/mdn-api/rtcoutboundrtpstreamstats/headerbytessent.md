---
title: "RTCOutboundRtpStreamStats: headerBytesSent property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcoutboundrtpstreamstats/headerbytessent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCOutboundRtpStreamStats: headerBytesSent property

The **`headerBytesSent`** property of the `RTCOutboundRtpStreamStats` dictionary indicates the total number of RTP header and padding bytes sent for this synchronization source (SSRC).

Note that the total number of bytes sent as payload over the transport is equal to: `headerBytesSent` + `bytesSent`.

## Value

A positive integer.
