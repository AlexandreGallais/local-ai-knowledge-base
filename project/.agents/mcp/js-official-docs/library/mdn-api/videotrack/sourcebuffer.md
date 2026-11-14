---
title: "VideoTrack: sourceBuffer property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/videotrack/sourcebuffer/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# VideoTrack: sourceBuffer property

The read-only **`VideoTrack`**
property **`sourceBuffer`** returns the
`SourceBuffer` that created the track, or null if the track was not
created by a `SourceBuffer` or the `SourceBuffer` has been
removed from the `MediaSource.sourceBuffers` attribute of its parent
media source.

## Value

A `SourceBuffer` or null.
