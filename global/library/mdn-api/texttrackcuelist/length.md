---
title: "TextTrackCueList: length property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/texttrackcuelist/length/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TextTrackCueList: length property

The **`length`** read-only property of the `TextTrackCueList` interface returns the number of cues in the list.

## Value

An `unsigned long` which is the number of cues in the list.

## Examples

The `TextTrack.cues` property returns a `TextTrackCueList` containing the current cues for that particular track. Calling `cues.length` returns the number of cues in the list. Using the WebVTT track below, the value of `length` is 5.

```plain
WEBVTT

first
00:00:00.000 --> 00:00:00.999  line:80%
Hildy!

second
00:00:01.000 --> 00:00:01.499 line:80%
How are you?

third
00:00:01.500 --> 00:00:02.999 line:80%
Tell me, is the ruler of the universe in?

fourth
00:00:03.000 --> 00:00:04.299 line:80%
Yes, they're in - in a bad humor

fifth
00:00:04.300 --> 00:00:06.000 line:80%
Somebody must've stolen the crown jewels
```

```js
const video = document.getElementById("video");
video.onplay = () => {
  console.log(video.textTracks[0].cues.length); // 5
};
```
