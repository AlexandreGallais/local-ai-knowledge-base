---
title: "VTTCue: align property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/vttcue/align/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# VTTCue: align property

The **`align`** property of the `VTTCue` interface represents the alignment of all of the lines of text in the text box.

## Value

A string containing one of the following values:

- `"start"`
    Start alignment.
- `"center"`
    Center alignment.
- `"end"`
    End alignment.
- `"left"`
    Left alignment.
- `"right"`
    Right alignment.

## Examples

In the following example a new `VTTCue` is created, then the value of `align` is set to `"start"`. The value is then printed to the console.

```js
let video = document.querySelector("video");
let track = video.addTextTrack("captions", "Captions", "en");
track.mode = "showing";

let cue = new VTTCue(0, 0.9, "Hildy!");
cue.align = "start";
console.log(cue.align);

track.addCue(cue);
```
