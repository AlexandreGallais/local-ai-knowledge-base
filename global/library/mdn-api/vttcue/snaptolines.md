---
title: "VTTCue: snapToLines property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/vttcue/snaptolines/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# VTTCue: snapToLines property

The **`snapToLines`** property of the `VTTCue` interface is a `Boolean` indicating if the `VTTCue.line` property is an integer number of lines, or a percentage of the video size.

## Value

A `Boolean`.

## Examples

In the following example a new `VTTCue` is created, then the value of `snapToLines` is set to `true`. The value is then printed to the console.

```js
let video = document.querySelector("video");
let track = video.addTextTrack("captions", "Captions", "en");
track.mode = "showing";

let cue = new VTTCue(0, 0.9, "Hildy!");
cue.snapToLines = true;
console.log(cue.snapToLines);

track.addCue(cue);
```
