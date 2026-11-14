---
title: "RTCInboundRtpStreamStats: audioLevel property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcinboundrtpstreamstats/audiolevel/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCInboundRtpStreamStats: audioLevel property

The **`audioLevel`** property of the `RTCInboundRtpStreamStats` dictionary indicates the audio level of the received (remote) track.

The `audioLevel` is averaged over some small interval, using the algorithm described under `totalAudioEnergy`.
The interval used is implementation dependent.

> **Note:**
> The value is undefined for video streams.

## Value

A real number.

The value is between 0..1 (linear), where 1.0 represents 0 dBov (decibels relative to full scale (DBFS)), 0 represents silence, and 0.5 represents approximately 6 dB SPL change in the sound pressure level from 0 dBov.

## See also

- `RTCAudioSourceStats.audioLevel` for audio levels of local tracks (that are being sent)
