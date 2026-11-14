---
title: "Document: fullscreenElement property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/document/fullscreenelement/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Document: fullscreenElement property

The
**`Document.fullscreenElement`** read-only
property returns the `Element` that is currently being presented in
fullscreen mode in this document, or `null` if fullscreen mode is not
currently in use.

Although this property is read-only, it will not throw if it is modified (even in
strict mode); the setter is a no-operation and it will be ignored.

## Value

The `Element` object that's currently in fullscreen mode; if fullscreen
mode isn't currently in use by the `document`, the returned
value is `null`. If there are multiple elements in fullscreen mode, the topmost (most recently requested) element is returned.

## Examples

This example presents a function, `isVideoInFullscreen()`, which looks at
the value returned by `fullscreenElement`; if the document is in fullscreen
mode (`fullscreenElement` isn't `null`) and the fullscreen
element's `nodeName` is `VIDEO`, indicating a
`` element, the function returns `true`, indicating
that the video is in fullscreen mode.

```js
function isVideoInFullscreen() {
  if (document.fullscreenElement?.nodeName === "VIDEO") {
    return true;
  }
  return false;
}
```

## See also

- Fullscreen API
- Guide to the Fullscreen API
- `Element.requestFullscreen()`
- `Document.exitFullscreen()`
- `:fullscreen` and `::backdrop`
- The `` `allowfullscreen`
  attribute
