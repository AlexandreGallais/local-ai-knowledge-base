---
title: "RTCInboundRtpStreamStats: totalInterFrameDelay property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcinboundrtpstreamstats/totalinterframedelay/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCInboundRtpStreamStats: totalInterFrameDelay property

The **`totalInterFrameDelay`** property of the `RTCInboundRtpStreamStats` dictionary indicates the total accumulated time between consecutively rendered frames, in seconds.
It is recorded after each frame is rendered.

The inter-frame delay variance can be calculated from `totalInterFrameDelay`, `totalSquaredInterFrameDelay` , and `framesRendered` according to the formula: `(totalSquaredInterFrameDelay - totalInterFrameDelay^2/ framesRendered)/framesRendered`.

> **Note:**
> The property is undefined for audio streams.

## Value

A positive number, in seconds.
