---
title: "VideoTrack: id property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/videotrack/id/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# VideoTrack: id property

The **`id`** read-only property of the `VideoTrack` interface contains a string which uniquely identifies the track represented by the **`VideoTrack`**.

This ID can be used with the
`VideoTrackList.getTrackById()` method to locate a specific track within
the media associated with a media element.

The track ID can also be used as the fragment of a URL that loads the specific track
(if the media supports media fragments).

## Value

A string which identifies the track, suitable for use when calling
`getTrackById()` on a
`VideoTrackList` such as the one specified by a media element's
`videoTracks` property.
