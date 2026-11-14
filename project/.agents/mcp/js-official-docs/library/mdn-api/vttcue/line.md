---
title: "VTTCue: line property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/vttcue/line/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# VTTCue: line property

The **`line`** property of the `VTTCue` interface represents the cue line of this WebVTT cue.

## Value

A number, or `"auto"` representing the cue line of this WebVTT cue.

## Examples

In the following example a new `VTTCue` is created, then the value of `line` is set to `1`. The value is then printed to the console.

```js
let video = document.querySelector("video");
let track = video.addTextTrack("captions", "Captions", "en");
track.mode = "showing";

let cue = new VTTCue(0, 0.9, "Hildy!");
cue.line = "1";
console.log(cue.line);

track.addCue(cue);
```
