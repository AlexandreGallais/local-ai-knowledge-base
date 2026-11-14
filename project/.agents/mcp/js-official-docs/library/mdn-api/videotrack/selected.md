---
title: "VideoTrack: selected property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/videotrack/selected/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# VideoTrack: selected property

The **`VideoTrack`** property
**`selected`** controls whether or not a particular video
track is active.

## Value

The `selected` property is a Boolean whose value is `true` if the
track is active. Only a single video track can be active at any given time, so setting
this property to `true` for one track while another track is active will make
that other track inactive.
