---
title: "Touch: screenX property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/touch/screenx/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Touch: screenX property

The **`screenX`** read-only property of the `Touch` interface returns the X coordinate of the touch point relative to the screen, not including any scroll offset.

## Value

A number.

## Examples

This example illustrates how to access the `Touch` object's `Touch.screenX` and `Touch.screenY` properties. The `Touch.screenX` property is the horizontal (x) coordinate of a touch point relative to the screen in CSS pixels. The `Touch.screenY` property is the vertical coordinate of a touch point relative to the screen in CSS pixels.

In following simple code snippet, we assume the user initiates multiple touch contacts on an element with an id of `source` and then releases contacts with the surface. When the `touchstart` event handler is invoked, each touch point's `Touch.screenX` and `Touch.screenY` coordinates are accessed.

```js
// Register a touchstart listeners for the 'source' element
const src = document.getElementById("source");

src.addEventListener("touchstart", (e) => {
  // Iterate through the touch points and log each screenX/Y coordinate.
  // The unit of each coordinate is CSS pixels.
  for (let i = 0; i < e.touches.length; i++) {
    console.log(`touchpoint[${i}].screenX = ${e.touches[i].screenX}`);
    console.log(`touchpoint[${i}].screenY = ${e.touches[i].screenY}`);
  }
});
```
