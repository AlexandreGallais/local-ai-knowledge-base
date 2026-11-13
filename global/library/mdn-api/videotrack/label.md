---
title: "VideoTrack: label property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/videotrack/label/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# VideoTrack: label property

The read-only **`VideoTrack`**
property **`label`** returns a string specifying the video
track's human-readable label, if one is available; otherwise, it returns an empty
string.

## Value

A string specifying the track's human-readable label, if one is
available in the track metadata. Otherwise, an empty string (`""`) is
returned.

For example, a track whose `kind` is
`"sign"` might have a `label` such as
`"A sign-language interpretation."`.

## Examples

This example returns an array of track kinds and labels for potential use in a user
interface to select video tracks for a specified media element. The list is filtered to
only allow certain track kinds through.

```js
function getTrackList(el) {
  const trackList = [];
  const wantedKinds = ["main", "alternative", "commentary"];

  el.videoTracks.forEach((track) => {
    if (wantedKinds.includes(track.kind)) {
      trackList.push({
        id: track.id,
        kind: track.kind,
        label: track.label,
      });
    }
  });
  return trackList;
}
```

The resulting `trackList` contains an array of video tracks whose
`kind` is one of those in the array `wantedKinds`, with each entry
providing the track's `id`, `kind`, and `label`.
