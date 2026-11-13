---
title: "HTMLMediaElement: played property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlmediaelement/played/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLMediaElement: played property

The **`played`** read-only property of the `HTMLMediaElement` interface indicates the time ranges the resource, an `<audio>` or `` media file, has played. It returns a new `TimeRanges` object that contains the ranges of the media source that the browser has played, if any, at the time the attribute is evaluated.

## Value

A `TimeRanges` object; representing the time ranges that have been played.

## Examples

```js
const media = document.querySelector("audio");
const playedTimeRanges = media.played;
let timePlayed = 0;
// calculate the total time the media has played
for (let i = 0; i < playedTimeRanges.length; i++) {
  timePlayed += playedTimeRanges.end(i) - playedTimeRanges.start(i);
}
console.log(`The media played for a total of ${timePlayed} seconds.`);
```

## See also

- `seeked` event
- `progress` event
- `HTMLMediaElement.seekable`
- `HTMLMediaElement.buffered`
- `HTMLVideoElement`
- `HTMLAudioElement`
