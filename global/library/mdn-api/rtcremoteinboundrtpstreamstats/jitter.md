---
title: "RTCRemoteInboundRtpStreamStats: jitter property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcremoteinboundrtpstreamstats/jitter/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCRemoteInboundRtpStreamStats: jitter property

The **`jitter`** property of the `RTCRemoteInboundRtpStreamStats` dictionary returns the packet jitter for the synchronization source (SSRC) as measured by the remote endpoint.

High packet jitter values indicate that packet arrival rates vary significantly, which may degrade video, audio, and other real-time communications over WebRTC.

## Value

Packet jitter, in seconds.

The value is calculated using the "interarrival jitter" algorithm described in 3550.

## See also

- `RTCRemoteInboundRtpStreamStats.ssrc`
- `RTCInboundRtpStreamStats.jitter`
