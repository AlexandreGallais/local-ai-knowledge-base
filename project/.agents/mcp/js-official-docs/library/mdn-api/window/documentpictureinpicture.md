---
title: "Window: documentPictureInPicture property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/window/documentpictureinpicture/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Window: documentPictureInPicture property

The **`documentPictureInPicture`** read-only property of the
`Window` interface returns a reference to the `DocumentPictureInPicture` object for the current document context.

## Value

A `DocumentPictureInPicture` object instance.

## Examples

```js
const videoPlayer = document.getElementById("player");

// …

// Open a Picture-in-Picture window.
await window.documentPictureInPicture.requestWindow({
  width: videoPlayer.clientWidth,
  height: videoPlayer.clientHeight,
});

// …
```

## See also

- `Document Picture-in-Picture API`
- Using the Document Picture-in-Picture API
