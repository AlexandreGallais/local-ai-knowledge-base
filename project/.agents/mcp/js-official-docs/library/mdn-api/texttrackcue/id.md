---
title: "TextTrackCue: id property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/texttrackcue/id/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TextTrackCue: id property

The **`id`** property of the `TextTrackCue` interface returns and sets the identifier for this cue.

## Value

A string containing the ID of this cue.

## Examples

In the following example a new `VTTCue` (which inherits from `TextTrackCue`) is created. The `id` property is then set to "first", before the cue is added.

```js
let video = document.querySelector("video");
let track = video.addTextTrack("captions", "Captions", "en");
track.mode = "showing";

let cue = new VTTCue(0, 0.9, "Hildy!");
cue.id = "first";
track.addCue(cue);
```
