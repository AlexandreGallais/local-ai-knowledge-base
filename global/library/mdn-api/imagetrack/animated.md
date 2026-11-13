---
title: "ImageTrack: animated property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/imagetrack/animated/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ImageTrack: animated property

The **`animated`** property of the `ImageTrack` interface returns `true` if the track is animated and therefore has multiple frames.

## Value

A `Boolean`, if `true` this is an animated track.

## Examples

The following example prints the value of `animated` to the console.

```js
let track = imageDecoder.tracks.selectedTrack;
console.log(track.animated);
```
