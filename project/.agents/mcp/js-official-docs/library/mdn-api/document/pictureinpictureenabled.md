---
title: "Document: pictureInPictureEnabled property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/document/pictureinpictureenabled/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Document: pictureInPictureEnabled property

The **`pictureInPictureEnabled`** read-only property of the `Document` interface indicates whether or not picture-in-picture mode is available.

Picture-in-Picture mode is available by default unless denied by the page Permissions-Policy.

## Value

A boolean value, which is `true` if a video can enter picture-in-picture and be displayed in a floating window by calling `HTMLVideoElement.requestPictureInPicture()`. If picture-in-picture mode isn't available, this value is `false`.

Although this property is read-only, it will not throw if it is modified (even in strict mode); the setter is a no-operation and will be ignored.

## Examples

### Basic usage

In this example, before attempting to enter picture-in-picture mode for a `` element the value of `pictureInPictureEnabled` is checked, to avoid making the call if the feature is not available.

```js
function requestPictureInPicture() {
  if (document.pictureInPictureEnabled) {
    videoElement.requestPictureInPicture();
  } else {
    console.log("Your browser cannot use picture-in-picture right now");
  }
}
```

## See also

- `HTMLVideoElement.requestPictureInPicture()`
- `HTMLVideoElement.disablePictureInPicture`
- `Document.exitPictureInPicture()`
- `Document.pictureInPictureElement`
- `:picture-in-picture`
