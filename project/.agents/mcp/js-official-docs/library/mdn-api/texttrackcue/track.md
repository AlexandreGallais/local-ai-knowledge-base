---
title: "TextTrackCue: track property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/texttrackcue/track/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TextTrackCue: track property

The **`track`** read-only property of the `TextTrackCue` interface returns the `TextTrack` object that this cue belongs to.

## Value

A `TextTrack` object.

## Examples

In the following example a new `VTTCue` (which inherits from `TextTrackCue`) is created, then added to a track. The value of `track` is printed to the console.

```js
const video = document.querySelector("video");
const captionTrack = video.addTextTrack("captions", "Captions", "en");
captionTrack.mode = "showing";

const cue = new VTTCue(0, 0.9, "Hildy!");
captionTrack.addCue(cue);
console.log(cue.track); // a TextTrack object.
```
