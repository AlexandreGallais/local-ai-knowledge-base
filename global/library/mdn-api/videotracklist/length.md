---
title: "VideoTrackList: length property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/videotracklist/length/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# VideoTrackList: length property

The read-only **`VideoTrackList`**
property **`length`** returns the number of entries in the
`VideoTrackList`, each of which is a `VideoTrack` representing
one video track in the media element.

A value of 0 indicates that there are no
video tracks in the media.

## Value

A number indicating how many video tracks are included in the
`VideoTrackList`. Each track can be accessed by treating the
`VideoTrackList` as an array of objects of type `VideoTrack`.

## Examples

This snippet gets the number of video tracks in the first ``
element found in the DOM by `querySelector()`.

```js
const videoElem = document.querySelector("video");
let numVideoTracks = 0;

if (videoElem.videoTracks) {
  numVideoTracks = videoElem.videoTracks.length;
}
```

Note that this sample checks to be sure `HTMLMediaElement.videoTracks` is
defined, to avoid failing on browsers without support for `VideoTrack`.
