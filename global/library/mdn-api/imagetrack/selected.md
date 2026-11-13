---
title: "ImageTrack: selected property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/imagetrack/selected/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ImageTrack: selected property

The **`selected`** property of the `ImageTrack` interface returns `true` if the track is selected for decoding.

## Value

A `Boolean`, if `true` the track is selected for decoding.

## Examples

The following example prints the value of `selected` to the console.

```js
let track = imageDecoder.tracks.selectedTrack;
console.log(track.selected); // this is the selected track so should return true.
```
