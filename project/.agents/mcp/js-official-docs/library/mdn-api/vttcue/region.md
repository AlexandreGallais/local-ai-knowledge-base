---
title: "VTTCue: region property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/vttcue/region/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# VTTCue: region property

The **`region`** property of the `VTTCue` interface returns and sets the `VTTRegion` that this cue belongs to.

## Value

A `VTTRegion` object.

## Examples

In the following example a new `VTTCue` is created, then the value of `region` is printed to the console.

```js
let video = document.querySelector("video");
let track = video.addTextTrack("captions", "Captions", "en");
track.mode = "showing";

let cue = new VTTCue(0, 0.9, "Hildy!");
console.log(cue.region);

track.addCue(cue);
```
