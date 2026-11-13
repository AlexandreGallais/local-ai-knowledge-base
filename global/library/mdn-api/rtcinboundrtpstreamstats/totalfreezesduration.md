---
title: "RTCInboundRtpStreamStats: totalFreezesDuration property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcinboundrtpstreamstats/totalfreezesduration/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCInboundRtpStreamStats: totalFreezesDuration property

The **`totalFreezesDuration`** property of the `RTCRemoteInboundRtpStreamStats` dictionary indicates the total time that the video in this stream has spent frozen, in seconds.

A freeze is counted if the interval between two rendered frames is equal or greater than the larger of "three times the average duration", or "the average + 150ms", and the time taken between frames is added to the `totalFreezesDuration`.

The average freeze duration can be calculated using `totalFreezesDuration / freezeCount`.

> **Note:**
> The property is undefined for audio streams.

## Value

A positive number, in seconds.

## See also

- `freezeCount`
