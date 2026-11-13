---
title: "RTCAudioSourceStats: kind property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcaudiosourcestats/kind/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCAudioSourceStats: kind property

The **`kind`** property of the `RTCAudioSourceStats` dictionary is a string with the value `audio`.

The `kind` is used to differentiate between audio and video media sources when iterating an `RTCStatsReport`, which both have a `type` of `media-source` (a `kind` of `video` indicates an `RTCVideoSourceStats` object).

## Value

A string with the value `audio`.
