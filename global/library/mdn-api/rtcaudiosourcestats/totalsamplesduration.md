---
title: "RTCAudioSourceStats: totalSamplesDuration property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcaudiosourcestats/totalsamplesduration/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCAudioSourceStats: totalSamplesDuration property

The **`totalSamplesDuration`** property of the `RTCAudioSourceStats` dictionary represents the combined duration of all samples produced by the media source over the lifetime of this stats object, in seconds.
It does not include samples dropped before reaching this media source.

This can be used with `totalAudioEnergy` to compute an average audio level over different intervals.

> **Note:**
> For audio duration of remotely sourced tracks, see `RTCInboundRtpStreamStats.totalSamplesDuration`.

## Value

A number indicating the total duration of all samples produced by this source over the lifetime this stats object, in seconds.
