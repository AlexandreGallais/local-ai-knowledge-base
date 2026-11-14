---
title: "ImageTrackList: selectedTrack property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/imagetracklist/selectedtrack/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ImageTrackList: selectedTrack property

The **`selectedTrack`** property of the `ImageTrackList` interface returns an `ImageTrack` object representing the currently selected track.

## Value

An `ImageTrack` object.

## Examples

The following example returns the `selectedTrack` then prints it to the console.

```js
let track = imageDecoder.tracks.selectedTrack;
console.log(track);
```
