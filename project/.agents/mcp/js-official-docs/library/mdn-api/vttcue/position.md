---
title: "VTTCue: position property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/vttcue/position/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# VTTCue: position property

The **`position`** property of the `VTTCue` interface represents the indentation of the cue within the line.

## Value

A number, or `"auto"` representing the indentation of the cue within the line.

## Examples

In the following example a new `VTTCue` is created, then the value of `position` is set to `2`. The value is then printed to the console.

```js
let video = document.querySelector("video");
let track = video.addTextTrack("captions", "Captions", "en");
track.mode = "showing";

let cue = new VTTCue(0, 0.9, "Hildy!");
cue.position = "2";
console.log(cue.position);

track.addCue(cue);
```
