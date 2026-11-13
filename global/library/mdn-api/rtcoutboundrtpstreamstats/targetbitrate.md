---
title: "RTCOutboundRtpStreamStats: targetBitrate property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcoutboundrtpstreamstats/targetbitrate/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCOutboundRtpStreamStats: targetBitrate property

The **`targetBitrate`** property of the `RTCOutboundRtpStreamStats` dictionary represents the current target bitrate of the codec in use by the stream.

The value is dynamic, reflecting the encoder settings and other factors such as network conditions and available bandwidth.
It should correlate closely to the payload bytes sent per second (excluding retransmissions).

## Value

A number representing the target rate in bits per second.
This is defined in the same way as the Transport Independent Application Specific (TIAS) bitrate.

## See also

- `RTCOutboundRtpStreamStats.bytesSent`
- `RTCOutboundRtpStreamStats.retransmittedBytesSent`
