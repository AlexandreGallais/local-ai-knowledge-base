---
title: "ImageTrack: frameCount property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/imagetrack/framecount/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ImageTrack: frameCount property

The **`frameCount`** property of the `ImageTrack` interface returns the number of frames in the track.

## Value

An integer.

## Examples

The following example prints the value of `frameCount` to the console.

```js
let track = imageDecoder.tracks.selectedTrack;
console.log(track.frameCount);
```
