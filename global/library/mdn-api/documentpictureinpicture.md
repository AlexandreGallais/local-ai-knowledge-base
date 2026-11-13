---
title: "DocumentPictureInPicture"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/documentpictureinpicture/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DocumentPictureInPicture

The **`DocumentPictureInPicture`** interface of the `Document Picture-in-Picture API` is the entry point for creating and handling document picture-in-picture windows.

It is accessed via the `Window.documentPictureInPicture` property.

## Instance properties

_Inherits properties from its parent, `EventTarget`._

- `window` (read-only)
    Returns a `Window` instance representing the browsing context inside the Picture-in-Picture window.

## Instance methods

_Inherits methods from its parent, `EventTarget`._

- `requestWindow()`
    Opens the Picture-in-Picture window for the current main browsing context. Returns a `Promise` that fulfills with a `Window` instance representing the browsing context inside the Picture-in-Picture window.

## Events

_Inherits events from its parent, `EventTarget`._

- `enter`
    Fired when the Picture-in-Picture window is successfully opened.

## Examples

```js
const videoPlayer = document.getElementById("player");

// …

// Open a Picture-in-Picture window.
const pipWindow = await window.documentPictureInPicture.requestWindow({
  width: videoPlayer.clientWidth,
  height: videoPlayer.clientHeight,
});

// …
```

See Document Picture-in-Picture API Example for a full working demo (see the full source code also).

## See also

- `Document Picture-in-Picture API`
- Using the Document Picture-in-Picture API
