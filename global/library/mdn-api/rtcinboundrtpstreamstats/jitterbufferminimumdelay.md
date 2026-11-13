---
title: "RTCInboundRtpStreamStats: jitterBufferMinimumDelay property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcinboundrtpstreamstats/jitterbufferminimumdelay/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCInboundRtpStreamStats: jitterBufferMinimumDelay property

The **`jitterBufferMinimumDelay`** property of the `RTCInboundRtpStreamStats` dictionary indicates the minimum jitter buffer delay that might be achieved given only the network characteristics such as jitter and packet loss.

The jitter buffer delay may be impacted by user settings such as `RTCRtpReceiver.jitterBufferTarget`, and WebRTC mechanisms such as AV synchronization.
`jitterBufferMinimumDelay` can be compared to the `jitterBufferTargetDelay` to examine the effect of these external factors on the delay.

The property is updated when `jitterBufferEmittedCount` is updated.

## Value

A positive number, in seconds.

## See also

- `jitterBufferEmittedCount`
- `jitterBufferDelay`
- `jitterBufferTargetDelay`
