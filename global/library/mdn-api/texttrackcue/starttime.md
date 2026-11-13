---
title: "TextTrackCue: startTime property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/texttrackcue/starttime/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TextTrackCue: startTime property

The **`startTime`** property of the `TextTrackCue` interface returns and sets the start time of the cue.

## Value

A number representing the start time, in seconds.

## Examples

In the following example a new `VTTCue` (which inherits from `TextTrackCue`) is created starting at 0.1 second and ending at 0.9 seconds. The `startTime` property is then printed to the console.

```js
let video = document.querySelector("video");
let track = video.addTextTrack("captions", "Captions", "en");
track.mode = "showing";

let cue = new VTTCue(0.1, 0.9, "Hildy!");
console.log(cue.startTime); // 0.1
track.addCue(cue);
```
