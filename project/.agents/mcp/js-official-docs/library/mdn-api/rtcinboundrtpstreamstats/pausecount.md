---
title: "RTCInboundRtpStreamStats: pauseCount property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcinboundrtpstreamstats/pausecount/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCInboundRtpStreamStats: pauseCount property

The **`pauseCount`** property of the `RTCRemoteInboundRtpStreamStats` dictionary indicates the total number of pauses experienced by this receiver.

A pause is counted when a new frame is rendered more than 5 seconds after the last frame was rendered.

The average pause duration can be calculated using `totalPausesDuration / pauseCount`.

> **Note:**
> The property is undefined for audio streams.

## Value

A positive integer.

## See also

- `totalPausesDuration`
