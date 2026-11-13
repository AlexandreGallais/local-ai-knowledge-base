---
title: "HTMLMediaElement: videoTracks property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlmediaelement/videotracks/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLMediaElement: videoTracks property

The read-only **`videoTracks`**
property on `HTMLMediaElement` objects returns a
`VideoTrackList` object listing all of the `VideoTrack`
objects representing the media element's video tracks.

The returned list is _live_; that is, as tracks are added to and removed from
the media element, the list's contents change dynamically. Once you have a reference to
the list, you can monitor it for changes to detect when new video tracks are added or
existing ones removed. See VideoTrackList events
to learn more about watching for changes to a media element's track list.

## Value

A `VideoTrackList` object representing the list of video tracks included
in the media element. The list of tracks can be accessed using array notation, or using
the object's `getTrackById()` method.

Each track is represented by a `VideoTrack` object which provides
information about the track.

## See also

- `HTMLMediaElement`: Interface used to define the `HTMLMediaElement.videoTracks` property
- ``
- `VideoTrack`, `VideoTrackList`
