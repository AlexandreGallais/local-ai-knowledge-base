---
title: "TrackEvent: track property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/trackevent/track/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TrackEvent: track property

The read-only **`track`** property of
the `TrackEvent` interface specifies the media track object to which the
event applies.

The media track will be an `AudioTrack`,
`VideoTrack`, or `TextTrack` object.

## Value

An object which is one of the types `AudioTrack`,
`VideoTrack`, or `TextTrack`, depending on the type of media
represented by the track. This identifies the track to which the event applies.
