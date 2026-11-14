---
title: "RTCInboundRtpStreamStats: totalSquaredInterFrameDelay property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcinboundrtpstreamstats/totalsquaredinterframedelay/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCInboundRtpStreamStats: totalSquaredInterFrameDelay property

The **`totalSquaredInterFrameDelay`** property of the `RTCInboundRtpStreamStats` dictionary indicates the sum of the square of each inter-frame delay between consecutively rendered frames.
It is recorded after each frame is rendered.

The inter-frame delay variance be calculated from `totalInterFrameDelay`, `totalSquaredInterFrameDelay`, and `framesRendered`, according to the formula: `(totalSquaredInterFrameDelay - totalInterFrameDelay^2/ framesRendered)/framesRendered`.

> **Note:**
> The property is undefined for audio streams.

## Value

A positive number.
