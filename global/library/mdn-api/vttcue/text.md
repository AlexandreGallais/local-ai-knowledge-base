---
title: "VTTCue: text property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/vttcue/text/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# VTTCue: text property

The **`text`** property of the `VTTCue` interface represents the text contents of the cue.

## Value

A string containing the raw text of the cue.

## Examples

In the following example a new `VTTCue` is created, then the value of `text` is set to the string `"new cue value"`. The value is then printed to the console.

```js
let video = document.querySelector("video");
let track = video.addTextTrack("captions", "Captions", "en");
track.mode = "showing";

let cue = new VTTCue(0, 0.9, "Hildy!");
cue.text = "new cue value";
console.log(cue.text); // 'new cue value';

track.addCue(cue);
```
