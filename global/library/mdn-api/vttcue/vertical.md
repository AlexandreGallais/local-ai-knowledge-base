---
title: "VTTCue: vertical property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/vttcue/vertical/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# VTTCue: vertical property

The **`vertical`** property of the `VTTCue` interface is a string representing the cue's writing direction.

## Value

A string containing one of the following values:

- `""` (an empty string)
    Represents a horizontal writing direction.
- `"rl"`
    Represents a vertical writing direction growing to the left.
- `"lr"`
    Represents a vertical writing direction growing to the right.

## Examples

In the following example a new `VTTCue` is created, then the value of `vertical` is set to `"rl"`. The value is then printed to the console.

```js
let video = document.querySelector("video");
let track = video.addTextTrack("captions", "Captions", "en");
track.mode = "showing";

let cue = new VTTCue(0, 0.9, "Hildy!");
cue.vertical = "rl";
console.log(cue.vertical);

track.addCue(cue);
```
