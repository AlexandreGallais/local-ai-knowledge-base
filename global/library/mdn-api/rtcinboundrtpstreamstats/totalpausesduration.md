---
title: "RTCInboundRtpStreamStats: totalPausesDuration property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcinboundrtpstreamstats/totalpausesduration/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCInboundRtpStreamStats: totalPausesDuration property

The **`totalPausesDuration`** property of the `RTCRemoteInboundRtpStreamStats` dictionary indicates the total time that the video in this stream has spent paused, in seconds

A pause is counted when a new frame is rendered more than 5 seconds after the last frame was rendered, and the time taken between frames is added to the `totalPausesDuration`.

The average pause duration can be calculated using `totalPausesDuration / pauseCount`.

> **Note:**
> The property is undefined for audio streams.

## Value

A positive number, in seconds.

## See also

- `pauseCount`
