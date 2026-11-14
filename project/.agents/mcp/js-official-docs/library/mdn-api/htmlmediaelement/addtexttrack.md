---
title: "HTMLMediaElement: addTextTrack() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlmediaelement/addtexttrack/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLMediaElement: addTextTrack() method

The **`addTextTrack()`** method of the `HTMLMediaElement` interface creates a new `TextTrack` object and adds it to the media element. It fires an `addtrack` event on this media element's `textTracks`. This method can't be used on a `TextTrackList` interface, only an `HTMLMediaElement`.

## Syntax

```js
addTextTrack(kind)
addTextTrack(kind, label)
addTextTrack(kind, label, language)
```

### Parameters

- `kind`
    A string representing the `TextTrack.kind` property (`subtitles`, `captions`, `descriptions`, `chapters`, or `metadata`).
- `label`
    A string representing the `TextTrack.label` property.
- `language`
    A string representing the `TextTrack.language` property.

### Return value

The newly created `TextTrack` object.

### Exceptions

None.

## Examples

This example adds a new `TextTrack` with the `kind` set to `"subtitles"`, and adds a new `VTTCue` to that.

```js
const video = document.querySelector("video");
const newTrack = video.addTextTrack("subtitles");
newTrack.addCue(new VTTCue(3, 6, "Hello world!"));
console.log(newTrack.cues[0].text);
// "Hello world!"
```

## See also

- `TextTrack`
- WebVTT API
- Web media technologies
- Learning: Video and audio content
- Using the Web Audio API
