---
title: "TextTrack: kind property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/texttrack/kind/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TextTrack: kind property

The **`kind`** read-only property of the `TextTrack` interface returns the kind of text track this object represents. This decides how the track will be handled by a user agent.

## Value

A string. One of:

- `"subtitles"`
    The cues are overlaid on the video. Positioning of the cues is controlled using the properties of an object that inherits from `TextTrackCue`, for example `VTTCue`.
- `"captions"`
    The cues are overlaid on the video. Positioning of the cues is controlled using the properties of an object that inherits from `TextTrackCue`, for example `VTTCue`.
- `"descriptions"`
    The cues are made available in a non-visual fashion.
- `"chapters"`
    The user agent will make available a mechanism to navigate by selecting a cue.
- `"metadata"`
    Additional data related to the media data, which could be used for interactive views.

## Examples

In the following example the value of `kind` is printed to the console.

```js
let video = document.querySelector("video");
let track = video.addTextTrack("captions", "Captions", "en");
track.mode = "showing";
console.log(track.kind);
```
