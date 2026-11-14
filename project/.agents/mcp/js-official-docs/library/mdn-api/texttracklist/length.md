---
title: "TextTrackList: length property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/texttracklist/length/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TextTrackList: length property

The read-only **`TextTrackList`**
property **`length`** returns the number of entries in the
`TextTrackList`, each of which is a `TextTrack` representing
one track in the media element.

A value of 0 indicates that there are no text
tracks in the media.

## Value

A number indicating how many text tracks are included in the
`TextTrackList`. Each track can be accessed by treating the
`TextTrackList` as an array of objects of type `TextTrack`.

## Examples

This snippet gets the number of text tracks in the first media element found in the
DOM by `querySelector()`.

```js
const mediaElem = document.querySelector("video, audio");
let numTextTracks = 0;

if (mediaElem.textTracks) {
  numTextTracks = mediaElem.textTracks.length;
}
```

Note that this sample checks to be sure `HTMLMediaElement.textTracks` is
defined, to avoid failing on browsers without support for `TextTrack`.
