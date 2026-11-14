---
title: "VideoPlaybackQuality: corruptedVideoFrames property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/videoplaybackquality/corruptedvideoframes/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# VideoPlaybackQuality: corruptedVideoFrames property

The `VideoPlaybackQuality` interface's read-only
**`corruptedVideoFrames`** property the number of corrupted
video frames that have been received since the `` element was
last loaded or reloaded.

## Value

The number of corrupted video frames that have been received since the
`` element was last loaded or reloaded.

It is up to the user agent to determine whether or not to display a
corrupted video frame. If a corrupted frame is dropped, then both
`corruptedVideoFrames` and
`droppedVideoFrames` are
incremented.

## Examples

This example determines the percentage of frames which have been corrupted, and if the
value is greater than 5%, calls a function called `downgradeVideo()` that
would be implemented to switch to a different video that might tax the network less.

```js
const videoElem = document.getElementById("my_vid");
const quality = videoElem.getVideoPlaybackQuality();

if (quality.corruptedVideoFrames / quality.totalVideoFrames > 0.05) {
  downgradeVideo(videoElem);
}
```

## See also

- The `HTMLVideoElement.getVideoPlaybackQuality()` method for
  constructing and returning this interface
