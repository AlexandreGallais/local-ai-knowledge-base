---
title: "RTCInboundRtpStreamStats: freezeCount property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcinboundrtpstreamstats/freezecount/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCInboundRtpStreamStats: freezeCount property

The **`freezeCount`** property of the `RTCInboundRtpStreamStats` dictionary indicates the total number of video freezes experienced by this receiver.

A freeze is counted if the interval between two rendered frames is equal to or greater than the larger of "three times the average duration", or "the average + 150ms".
This ensures that the delay required to increment the freeze count scales appropriately with the frame rate.

> **Note:**
> The value is undefined for audio streams.

## Value

A positive integer.

## See also

- `totalFreezesDuration`
