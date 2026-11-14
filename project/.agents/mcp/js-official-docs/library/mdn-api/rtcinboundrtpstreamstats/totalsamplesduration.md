---
title: "RTCInboundRtpStreamStats: totalSamplesDuration property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcinboundrtpstreamstats/totalsamplesduration/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCInboundRtpStreamStats: totalSamplesDuration property

The **`totalSamplesDuration`** property of the `RTCRemoteInboundRtpStreamStats` dictionary indicates the total duration of all audio samples that have been received.
In other words, the current duration of the track.

This can be used with `totalAudioEnergy` to compute an average audio level over different intervals.

> **Note:**
> The value is undefined for video streams.

## Value

A positive number, in seconds.

## See also

- `RTCAudioSourceStats.totalSamplesDuration` for the audio duration of sent samples.
- `totalSamplesReceived`
