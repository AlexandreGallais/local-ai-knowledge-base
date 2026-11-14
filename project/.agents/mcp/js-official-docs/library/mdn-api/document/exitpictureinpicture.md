---
title: "Document: exitPictureInPicture() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/document/exitpictureinpicture/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Document: exitPictureInPicture() method

The **`exitPictureInPicture()`** method of the `Document` interface requests that a video contained in this document, which is currently floating, be taken out of picture-in-picture mode.

This attempts to reverse the effects of a previous call to `HTMLVideoElement.requestPictureInPicture()`, restoring the video back into the website flow.

## Syntax

```js
exitPictureInPicture()
```

### Parameters

None.

### Return value

A `Promise`, which is resolved once the user agent has finished exiting picture-in-picture mode.
If an error occurs while attempting to exit picture-in-picture mode, the `catch()` handler for the promise is called.

### Exceptions

- `InvalidStateError` `DOMException`
    Thrown if `document.pictureInPictureElement` is `null`.

## Examples

### Basic usage

This example causes the current document to exit picture-in-picture mode whenever the mouse button is clicked within it.

```js
document.onclick = (event) => {
  if (document.pictureInPictureElement) {
    document
      .exitPictureInPicture()
      .then(() => console.log("Document Exited from Picture-in-Picture mode"))
      .catch((err) => console.error(err));
  } else {
    video.requestPictureInPicture();
  }
};
```

Note that if you want to track which video on your page is currently playing in picture-in-picture mode, you should listen to the `enterpictureinpicture` and `leavepictureinpicture` events on the `HTMLVideoElement` element(s) in question.
Alternatively, you can check whether `Document.pictureInPictureElement` refers to the current `HTMLVideoElement` element.

## See also

- `HTMLVideoElement.requestPictureInPicture()`
- `HTMLVideoElement.disablePictureInPicture`
- `Document.pictureInPictureEnabled`
- `Document.pictureInPictureElement`
- `:picture-in-picture`
- Picture-in-Picture events
