---
title: "RTCCodecStats: transportId property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtccodecstats/transportid/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCCodecStats: transportId property

The **`transportId`** property of the `RTCCodecStats` dictionary is a string that contains the unique identifier of the corresponding transport on which this codec is being used.

You can correlate the codec and associated transport statistics by matching the `RTCCodecStats.transportId` with an `RTCTransportStats.id` value.

## Value

A string that uniquely identifies a matching `RTCTransportStats` object using its `id`.
