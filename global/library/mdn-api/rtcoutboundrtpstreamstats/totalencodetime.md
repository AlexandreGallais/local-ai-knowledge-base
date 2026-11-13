---
title: "RTCOutboundRtpStreamStats: totalEncodeTime property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcoutboundrtpstreamstats/totalencodetime/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCOutboundRtpStreamStats: totalEncodeTime property

The **`totalEncodeTime`** property of the `RTCOutboundRtpStreamStats` dictionary represents the total number of seconds spent encoding the `framesEncoded` frames for this stream (`RTCRtpSender`).

The average encode time can be calculated by dividing this value by `framesEncoded`.
The time it takes to encode one frame is the time between sending the encoder a frame and the encoder returning encoded data for that frame.
It does not include any time spent packetizing the resulting data.

> **Note:**
> The property is undefined for audio streams.

## Value

A number representing the total time spent encoding frames, in seconds.
