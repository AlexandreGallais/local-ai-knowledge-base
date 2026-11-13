---
title: "HTMLVideoElement: videoWidth property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlvideoelement/videowidth/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLVideoElement: videoWidth property

The `HTMLVideoElement` interface's read-only **`videoWidth`** property indicates the intrinsic width of the video, expressed in CSS pixels.
In simple terms, this is the width of the media in its natural size.

See `HTMLVideoElement.videoHeight` > About intrinsic width and height for more details.

## Value

An integer value specifying the intrinsic width of the video in CSS pixels.
If the element's `readyState` is `HTMLMediaElement.HAVE_NOTHING`, then the value of this property is 0, because neither video nor poster frame size information is yet available.
