---
title: "RTCAudioSourceStats: audioLevel property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcaudiosourcestats/audiolevel/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCAudioSourceStats: audioLevel property

The **`audioLevel`** property of the `RTCAudioSourceStats` dictionary represents the audio level of the media source.

The level is averaged over some small implementation-dependent interval.
Users can alternatively calculate the average audio level over some arbitrary duration using the algorithm described in the `RTCAudioSourceStats` description.

> **Note:**
> For audio levels of remotely sourced tracks, see `RTCInboundRtpStreamStats.audioLevel`.

## Value

A number between 0 and 1 (linear), where 1.0 represents 0 dBov (decibels relative to full scale (DBFS)), 0 represents silence, and 0.5 represents approximately 6 dB SPL change in the sound pressure level from 0 dBov.
