---
title: "Window: screen property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/window/screen/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Window: screen property

The **`screen`** read-only property of the `Window` interface returns a reference to the screen object associated with the window. The `screen` object, implementing the `Screen` interface, is a special object for inspecting properties of the screen on which the current window is being rendered.

## Value

A `Screen` object.

## Examples

```js
if (screen.pixelDepth < 8) {
  // use low-color version of page
} else {
  // use regular, colorful page
}
```
