---
title: "TextTrack: addCue() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/texttrack/addcue/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TextTrack: addCue() method

The **`addCue()`** method of the `TextTrack` interface adds a new cue to the list of cues.

## Syntax

```js
addCue(cue)
```

### Parameters

- `cue`
    A `TextTrackCue`.

> **Note:**
> The `TextTrackCue` interface is an abstract class used as the parent for other cue interfaces such as `VTTCue`. Therefore, when adding a cue you will be using one of the cue types that inherit from `TextTrackCue`.

### Return value

Undefined.

### Exceptions

- `InvalidStateError` `DOMException`
    Thrown if the rules for this `TextTrackList` do not match those that are appropriate for the incoming `TextTrackCue`.

## Examples

In the following example two cues are added to a video text track using `addCue()`.

```js
let video = document.querySelector("video");
let track = video.addTextTrack("captions", "Captions", "en");
track.mode = "showing";
track.addCue(new VTTCue(0, 0.9, "Hildy!"));
track.addCue(new VTTCue(1, 1.4, "How are you?"));
```
