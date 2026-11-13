---
title: "TextTrack: activeCues property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/texttrack/activecues/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TextTrack: activeCues property

The **`activeCues`** read-only property of the `TextTrack` interface returns a `TextTrackCueList` object listing the currently active cues.

## Value

A `TextTrackCueList` object.

## Examples

The following example adds a new `TextTrack` to a video. The `activeCues` are printed to the console.

```js
let video = document.querySelector("video");
let track = video.addTextTrack("captions", "Captions", "en");
track.mode = "showing";
console.log(track.activeCues);
```
