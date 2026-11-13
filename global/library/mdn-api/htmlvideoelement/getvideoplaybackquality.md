---
title: "HTMLVideoElement: getVideoPlaybackQuality() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlvideoelement/getvideoplaybackquality/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLVideoElement: getVideoPlaybackQuality() method

The **`HTMLVideoElement`** method
**`getVideoPlaybackQuality()`** creates and returns a
`VideoPlaybackQuality` object containing metrics including how many
frames have been lost.

The data returned can be used to evaluate the quality of the video stream.

## Syntax

```js
getVideoPlaybackQuality()
```

### Parameters

None.

### Return value

A `VideoPlaybackQuality` object providing information about the video
element's current playback quality.

## Examples

This example updates an element to indicate the total number of video frames that have
elapsed so far in the playback process. This value includes any dropped or corrupted
frames, so it's not the same as "total number of frames played."

```js
const videoElem = document.getElementById("my_vid");
const counterElem = document.getElementById("counter");
const quality = videoElem.getVideoPlaybackQuality();

counterElem.innerText = quality.totalVideoFrames;
```

## See also

- The `` element
- The `VideoPlaybackQuality` interface.
