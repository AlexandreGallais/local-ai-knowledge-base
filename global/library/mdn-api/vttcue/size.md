---
title: "VTTCue: size property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/vttcue/size/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# VTTCue: size property

The **`size`** property of the `VTTCue` interface represents the size of the cue as a percentage of the video size.

## Value

A number representing the size of the cue as a percentage of the video size.

## Examples

In the following example a new `VTTCue` is created, then the value of `size` is set to `50`. The value is then printed to the console.

```js
let video = document.querySelector("video");
let track = video.addTextTrack("captions", "Captions", "en");
track.mode = "showing";

let cue = new VTTCue(0, 0.9, "Hildy!");
cue.size = 50;
console.log(cue.size);

track.addCue(cue);
```
