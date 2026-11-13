---
title: "Document: pictureInPictureElement property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/document/pictureinpictureelement/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Document: pictureInPictureElement property

The **`pictureInPictureElement`** read-only property of the `Document` interface returns the `Element` that is currently being presented in picture-in-picture mode in this document, or `null` if picture-in-picture mode is not currently in use.

## Value

A reference to the `Element` object that's currently in picture-in-picture mode.

Returns `null` if the document has no associated element in picture-in-picture mode. For example, there's no picture-in-picture element, or the element is from an iframe.

Although this property is read-only, it will not throw if it is modified (even in strict mode); the setter is a no-operation and will be ignored.

## Examples

### Basic usage

This example presents a function, `exitPictureInPicture()`, which tests the value returned by `pictureInPictureElement`.
If the document is in picture-in-picture mode (`pictureInPictureElement` isn't `null`), `Document.exitPictureInPicture()` is run to exit picture-in-picture mode.

```js
function exitPictureInPicture() {
  if (document.pictureInPictureElement) {
    document.exitPictureInPicture();
  }
}
```

## See also

- `HTMLVideoElement.requestPictureInPicture()`
- `HTMLVideoElement.disablePictureInPicture`
- `Document.pictureInPictureEnabled`
- `Document.exitPictureInPicture()`
- `:picture-in-picture`
