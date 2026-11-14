---
title: "VTTCue: positionAlign property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/vttcue/positionalign/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# VTTCue: positionAlign property

The **`positionAlign`** property of the `VTTCue` interface is used to determine what `VTTCue.position` is anchored to.

## Value

A string containing one of the following values:

- `"line-left"`
    Line-left alignment.
- `"center"`
    Center alignment.
- `"line-right"`
    Line-right alignment.
- `"auto"`
    Automatic alignment, which depends on the text alignment of the cue, interpreted as follows:
    - **line-left:** if the text alignment is left, the cue is using a LTR language and the text alignment is start, or the cue is using a RTL language and the text alignment is end.
    - **line-right:** if the text alignment is right, the cue is using a RTL language and the text alignment is start, or the cue is using a LTR language and the text alignment is end.
    - **center:** if there is no text alignment position set.

## Examples

In the following example a new `VTTCue` is created, then the value of `positionAlign` is set to `"line-right"`. The value is then printed to the console.

```js
let video = document.querySelector("video");
let track = video.addTextTrack("captions", "Captions", "en");
track.mode = "showing";

let cue = new VTTCue(0, 0.9, "Hildy!");
cue.positionAlign = "line-right";
console.log(cue.positionAlign);

track.addCue(cue);
```
