---
title: "Window: fullScreen property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/window/fullscreen/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Window: fullScreen property

The **`fullScreen`** property of the `Window`
interface indicates whether the window is displayed in fullscreen mode or not.

Switching between regular window and full screen will fire the "resize" event on the
corresponding window.

## Value

A boolean value with `true` meaning that the window is in fullscreen mode and `false` meaning it isn't.

## Examples

```js
if (window.fullScreen) {
  // it's fullscreen!
} else {
  // not fullscreen!
}
```
