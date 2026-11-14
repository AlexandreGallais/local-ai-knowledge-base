---
title: "HTMLVideoElement: requestPictureInPicture() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlvideoelement/requestpictureinpicture/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLVideoElement: requestPictureInPicture() method

The **`requestPictureInPicture()`** method of the `HTMLVideoElement` interface issues an asynchronous request to display the video in picture-in-picture mode.

It's not guaranteed that the video will be put into picture-in-picture.
If permission to enter that mode is granted, the returned `Promise` will resolve and the video will receive an `enterpictureinpicture` event to let it know that it's now in picture-in-picture.

## Syntax

```js
requestPictureInPicture()
```

### Parameters

None.

### Return value

A `Promise` that will resolve to a `PictureInPictureWindow` object that can be used to listen when a user will resize that floating window.

### Exceptions

- `NotSupportedError` `DOMException`
    Thrown if the feature is not supported (for example, disabled by a user preference or by a platform limitation).
- `SecurityError` `DOMException`
    Thrown if the feature is blocked by a Permissions Policy.
- `InvalidStateError` `DOMException`
    Thrown if the video element's `readState` is `HAVE_NOTHING`, or if the video element has no video track, or if the video element's `disablePictureInPicture` attribute is `true`.
- `NotAllowedError` `DOMException`
    Thrown if `document.pictureInPictureElement` is `null` and the document does not have transient activation.

## Security

Transient user activation is required. The user has to interact with the page or a UI element for this feature to work.

## Examples

This example requests that the video enters Picture-in-Picture mode, and sets an event listener to handle the floating window resizing.

```js
function enterPictureInPicture() {
  videoElement.requestPictureInPicture().then((pictureInPictureWindow) => {
    pictureInPictureWindow.addEventListener("resize", () =>
      onPipWindowResize(),
    );
  });
}
```

## See also

- The `` element
- `HTMLVideoElement.disablePictureInPicture`
- `Document.pictureInPictureEnabled`
- `Document.exitPictureInPicture()`
- `Document.pictureInPictureElement`
- `:picture-in-picture`
