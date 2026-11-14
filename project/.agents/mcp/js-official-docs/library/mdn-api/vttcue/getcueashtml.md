---
title: "VTTCue: getCueAsHTML() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/vttcue/getcueashtml/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# VTTCue: getCueAsHTML() method

The **`getCueAsHTML()`** method of the `VTTCue` interface returns a `DocumentFragment` containing the cue content.

## Syntax

```js
getCueAsHTML()
```

### Parameters

None.

### Return value

A `DocumentFragment`.

## Examples

In the following example a new `VTTCue` is created. The value as a document fragment is then printed to the console.

```js
let video = document.querySelector("video");
let track = video.addTextTrack("captions", "Captions", "en");
track.mode = "showing";

let cue = new VTTCue(0, 0.9, "Hildy!");
console.log(cue.getCueAsHTML());

track.addCue(cue);
```
