---
title: "RTCInboundRtpStreamStats: estimatedPlayoutTimestamp property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcinboundrtpstreamstats/estimatedplayouttimestamp/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCInboundRtpStreamStats: estimatedPlayoutTimestamp property

The **`estimatedPlayoutTimestamp`** property of the `RTCInboundRtpStreamStats` dictionary indicates the estimated playout time of this receiver's track.

This is the Network Time Protocol (NTP) timestamp of the last playable audio sample or video frame that has a known timestamp, extrapolated with the time elapsed since it was ready to be played out.
In other words, it is the estimated current playout time of the track in the NTP clock time of the sender, and can be present even if there is no audio currently playing.

This can be used to estimate how much audio and video tracks from the same source are out of sync.

## Value

A `DOMHighResTimeStamp`.
