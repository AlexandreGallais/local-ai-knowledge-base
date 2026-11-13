---
title: "VirtualKeyboard: boundingRect property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/virtualkeyboard/boundingrect/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# VirtualKeyboard: boundingRect property

The **`boundingRect`** property of the `VirtualKeyboard` interface contains a `DOMRect` indicating the position and size of the on-screen virtual keyboard that overlays the web page.

The on-screen virtual keyboard will overlay the viewport when the `Virtual Keyboard API` is used to prevent the browser from resizing the viewport automatically. This is done by setting the `overlaysContent` property to `true`.

## Value

A `DOMRect` which indicates the position and size of the virtual keyboard in the viewport.

The `x`, `y`, `width`, and `height` coordinates of the rectangle are useful to reposition content in the webpage that needs to be visible even when the virtual keyboard is displayed.

```js
const { x, y, width, height } = navigator.virtualKeyboard.boundingRect;
```

## See also

- `The VirtualKeyboard API`
- Full control with the VirtualKeyboard API
