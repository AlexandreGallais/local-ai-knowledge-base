---
title: "TextTrackCueList: getCueById() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/texttrackcuelist/getcuebyid/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TextTrackCueList: getCueById() method

The **`getCueById()`** method of the `TextTrackCueList` interface returns the first `VTTCue` in the list represented by the `TextTrackCueList` object whose identifier matches the value of `id`.

## Syntax

```js
getCueById(id)
```

### Parameters

- `id`
    A string which is an identifier for the cue.

### Return value

A `VTTCue` object.

## Examples

The `TextTrack.cues` property returns a `TextTrackCueList` containing the current cues for that particular track. Calling `cues.getCueById("second")` returns the `VTTCue` with an ID of "second".

```plain
WEBVTT

first
00:00:00.000 --> 00:00:00.999 line:80%
Hildy!

second
00:00:01.000 --> 00:00:01.499 line:80%
How are you?
```

```js
const video = document.getElementById("video");
video.onplay = () => {
  console.log(video.textTracks[0].cues.getCueById("second")); // a VTTCue object;
};
```
