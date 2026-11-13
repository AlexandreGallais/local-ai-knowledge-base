---
title: "RTCInboundRtpStreamStats: framesReceived property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcinboundrtpstreamstats/framesreceived/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCInboundRtpStreamStats: framesReceived property

The **`framesReceived`** property of the `RTCInboundRtpStreamStats` dictionary indicates the total number of complete frames received on this RTP stream over its lifetime.

Note that this may be lower than the total number of media source frames, which is provided in `RTCVideoSourceStats.frames`.

> **Note:**
> The value is undefined for audio streams.

## Value

A positive number.
