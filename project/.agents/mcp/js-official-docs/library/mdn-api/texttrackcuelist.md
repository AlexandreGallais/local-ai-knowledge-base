---
title: "TextTrackCueList"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/texttrackcuelist/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TextTrackCueList

The **`TextTrackCueList`** interface of the WebVTT API is an array-like object that represents a dynamically updating list of `TextTrackCue` objects.

An instance of this type is obtained from `TextTrack.cues` in order to get all the cues in the `TextTrack` object.
This interface has no constructor.

## Instance properties

- `TextTrackCueList.length` (read-only)
    An `unsigned long` that is the number of cues in the list.

## Instance methods

- `TextTrackCueList.getCueById()`
    Returns the first `TextTrackCue` object with the identifier passed to it.

## Examples

The `HTMLMediaElement.textTracks` property returns a `TextTrackList` object listing all of the `TextTrack` objects, one for each text track linked to the media. The `TextTrack.cues` property then returns a `TextTrackCueList` containing the cues for that particular track.

```js
const video = document.getElementById("video");
video.onplay = () => {
  console.log(video.textTracks[0].cues);
};
```
