---
title: "HTMLVideoElement: videoHeight property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlvideoelement/videoheight/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLVideoElement: videoHeight property

The `HTMLVideoElement` interface's read-only **`videoHeight`** property indicates the intrinsic height of the video, expressed in CSS pixels.
In simple terms, this is the height of the media in its natural size.

## Value

An integer value specifying the intrinsic height of the video in CSS pixels.
If the element's `readyState` is `HTMLMediaElement.HAVE_NOTHING`, then the value of this property is 0, because neither video nor poster frame size information is yet available.

### About intrinsic width and height

A user agent calculates the intrinsic width and height of the element's media by starting with the media's raw pixel width and height, then taking into account factors including:

- The media's aspect ratio.
- The media's clean aperture (the sub-rectangle centered within the media that matches
  the target aspect ratio).
- The target device's resolution.
- Any other factors required by the media format.

If the element is currently displaying the poster frame rather than rendered video, the poster frame's intrinsic size is considered to be the size of the `` element.

If at any time the intrinsic size of the media changes and the element's `readyState` isn't `HAVE_NOTHING`, a `resize` event will be sent to the `` element.
This can happen when the element switches from displaying the poster frame to displaying video content, or when the displayed video track changes.

## Examples

This example creates a handler for the `resize` event that resizes the `` element to match the intrinsic size of its contents.

```js
let v = document.getElementById("myVideo");

v.addEventListener("resize", (ev) => {
  let w = v.videoWidth;
  let h = v.videoHeight;

  if (w && h) {
    v.style.width = w;
    v.style.height = h;
  }
});
```

Note that this only applies the change if both the `videoWidth` and the `videoHeight` are non-zero.
This avoids applying invalid changes when there's no true information available yet for dimensions.
