---
title: "AudioTrackList: length property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/audiotracklist/length/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AudioTrackList: length property

The read-only **`AudioTrackList`**
property **`length`** returns the number of entries in the
`AudioTrackList`, each of which is an `AudioTrack`
representing one audio track in the media element. A value of 0 indicates that
there are no audio tracks in the media.

## Value

A number indicating how many audio tracks are included in the
`AudioTrackList`. Each track can be accessed by treating the
`AudioTrackList` as an array of objects of type `AudioTrack`.

## Examples

This snippet gets the number of audio tracks in the first ``
element found in the DOM by `querySelector()`.

```js
const videoElem = document.querySelector("video");
let numAudioTracks = 0;

if (videoElem.audioTracks) {
  numAudioTracks = videoElem.audioTracks.length;
}
```

Note that this sample checks to be sure `HTMLMediaElement.audioTracks` is
defined, to avoid failing on browsers without support for `AudioTrack`.
