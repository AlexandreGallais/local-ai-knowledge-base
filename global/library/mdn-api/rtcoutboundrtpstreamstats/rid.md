---
title: "RTCOutboundRtpStreamStats: rid property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcoutboundrtpstreamstats/rid/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCOutboundRtpStreamStats: rid property

The **`rid`** property of the `RTCOutboundRtpStreamStats` dictionary is a string that specifies the RTP stream ID, if defined.

The property is only defined where the `rid` has been set for the corresponding `RTCRtpSender`.
If set, this value will be present regardless of whether the RID RTP header extension has been negotiated.

## Value

The value of the `encodings.rid` argument passed to `RTCRtpSender.setParameters()`, if any, when the corresponding transceiver is created.
The property is undefined if the stream ID was not set.

> **Note:**
> The property is undefined for audio streams.
