---
title: "DocumentPictureInPicture: window property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/documentpictureinpicture/window/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DocumentPictureInPicture: window property

The **`window`** read-only property of the
`DocumentPictureInPicture` interface returns a `Window` instance representing the browsing context inside the Picture-in-Picture window.

## Value

A `Window` object instance if the Picture-in-Picture window has already been opened using `DocumentPictureInPicture.requestWindow()`, or `null` otherwise.

## Examples

```js
const videoPlayer = document.getElementById("player");

// …

await window.documentPictureInPicture.requestWindow({
  width: videoPlayer.clientWidth,
  height: videoPlayer.clientHeight,
});

// …

const pipWindow = window.documentPictureInPicture.window;
if (pipWindow) {
  // Mute video playing in the Picture-in-Picture window.
  const pipVideo = pipWindow.document.querySelector("#video");
  pipVideo.muted = true;
}
```

## See also

- `Document Picture-in-Picture API`
- Using the Document Picture-in-Picture API
