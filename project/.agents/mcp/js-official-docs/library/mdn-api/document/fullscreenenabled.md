---
title: "Document: fullscreenEnabled property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/document/fullscreenenabled/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Document: fullscreenEnabled property

The read-only **`fullscreenEnabled`**
property on the `Document` interface indicates whether or not fullscreen
mode is available.

fullscreen mode is available only for a page that has no
windowed plug-ins in any of its documents, and if all `` elements
which contain the document have their `allowfullscreen`
attribute set.

Although this property is read-only, it will not throw if it is modified (even in
strict mode); the setter is a no-operation and it will be ignored.

## Value

A boolean value which is `true` if the document and the
elements within can be placed into fullscreen mode by calling
`Element.requestFullscreen()`. If fullscreen mode isn't available, this
value is `false`.

## Examples

In this example, before attempting to request fullscreen mode for a
`` element, the value of `fullscreenEnabled` is
checked, in order to avoid making the attempt when not available.

```js
function requestFullscreen() {
  if (document.fullscreenEnabled) {
    videoElement.requestFullscreen();
  } else {
    console.log("Your browser cannot use fullscreen right now");
  }
}
```

## See also

- Fullscreen API
- Guide to the Fullscreen API
- `Element.requestFullscreen()`
- `Document.exitFullscreen()`
- `Document.fullscreenElement`
- `:fullscreen` and `::backdrop`
- The `` `allowfullscreen`
  attribute
