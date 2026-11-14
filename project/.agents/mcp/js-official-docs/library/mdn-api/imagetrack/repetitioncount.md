---
title: "ImageTrack: repetitionCount property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/imagetrack/repetitioncount/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ImageTrack: repetitionCount property

The **`repetitionCount`** property of the `ImageTrack` interface returns the number of repetitions of this track.

## Value

An integer.

## Examples

The following example prints the value of `repetitionCount` to the console.

```js
let track = imageDecoder.tracks.selectedTrack;
console.log(track.repetitionCount);
```
