---
title: "Window: screenX property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/window/screenx/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Window: screenX property

The **`screenX`** read-only property of the `Window` interface returns the horizontal distance, in CSS pixels, from the left border of the user's browser window to the left side of the screen.

> **Note:**
> `Window.screenLeft` is an alias of the older `screenX` property. `screenLeft` was originally supported only in IE but was introduced everywhere due to popularity.

## Value

A number equal to the number of CSS pixels from the left edge of the browser window to the left edge of the screen.

## Examples

In our screenleft-screentop example, you'll see a canvas onto which has been drawn a circle. In this example we are using `Window.screenLeft`/`Window.screenTop` plus `Window.requestAnimationFrame()` to constantly redraw the circle in the same physical position on the screen, even if the window position is moved.

See `Window.screenLeft` for more information.

## See also

- `window.screenLeft`
- `window.screenY`
