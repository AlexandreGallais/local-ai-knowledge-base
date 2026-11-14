---
title: "TextTrack: removeCue() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/texttrack/removecue/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TextTrack: removeCue() method

The **`removeCue()`** method of the `TextTrack` interface removes a cue from the list of cues.

## Syntax

```js
removeCue(cue)
```

### Parameters

- `cue`
    A `TextTrackCue`.

### Return value

Undefined.

### Exceptions

- `NotFoundError` `DOMException`
    Thrown if the given cue is not found in the list of cues.

> **Note:**
> The `TextTrackCue` interface is an abstract class used as the parent for other cue interfaces such as `VTTCue`. Therefore, when removing a cue you will be passing in one of the cue types that inherit from `TextTrackCue`.

## Examples

In the following example a cue is added to a video text track using `addCue()`, then removed using `removeCue`.

```js
let video = document.querySelector("video");
let track = video.addTextTrack("captions", "Captions", "en");
track.mode = "showing";
let cue = new VTTCue(0, 0.9, "Hildy!");
track.addCue(cue);
track.removeCue(cue);
```
