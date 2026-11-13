---
title: "MediaRecorder: audioBitrateMode property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mediarecorder/audiobitratemode/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MediaRecorder: audioBitrateMode property

The **`audioBitrateMode`** read-only property of the `MediaRecorder` interface returns the bitrate mode used to encode audio tracks.

## Value

One of the following:

- `constant`
    The `MediaRecorder` encodes at this constant bitrate.
- `variable`
    The `MediaRecorder` encodes using this variable bitrate, allowing more space to be used for complex signals and less space for less complex signals.
