---
title: "VideoPlaybackQuality: totalFrameDelay property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/videoplaybackquality/totalframedelay/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# VideoPlaybackQuality: totalFrameDelay property

The **`VideoPlaybackQuality.totalFrameDelay`** read-only
property returns a `double` containing the sum of the frame delay since the
creation of the associated `HTMLVideoElement`. The frame delay is the
difference between a frame's theoretical presentation time and its effective display
time.

## Value

A number.

## Examples

```js
const videoElt = document.getElementById("my_vid");
const quality = videoElt.getVideoPlaybackQuality();

alert(quality.totalFrameDelay);
```

## See also

- The `HTMLVideoElement.getVideoPlaybackQuality()` method for
  constructing and returning this interface.
- `MediaSource`
- `SourceBuffer`
