---
title: "TextTrack: cues property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/texttrack/cues/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TextTrack: cues property

The **`cues`** read-only property of the `TextTrack` interface returns a `TextTrackCueList` object containing all of the track's cues.

## Value

A `TextTrackCueList` object.

## Examples

In the following example two cues are added to a video text track using `addCue()`. The value of `cues` is printed to the console. The returned `TextTrackCueList` object contains the two cues.

```js
let video = document.querySelector("video");
let track = video.addTextTrack("captions", "Captions", "en");
track.mode = "showing";
track.addCue(new VTTCue(0, 0.9, "Hildy!"));
track.addCue(new VTTCue(1, 1.4, "How are you?"));
console.log(track.cues);
```
