---
title: "Touch: radiusX property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/touch/radiusx/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Touch: radiusX property

The **`radiusX`** read-only property of the `Touch` interface returns the X radius of the ellipse that most closely circumscribes the area of contact with the touch surface. The value is in CSS pixels of the same scale as `Touch.screenX`.

This value, in combination with `Touch.radiusY` and `Touch.rotationAngle` constructs an ellipse that approximates the size and shape of the area of contact between the user and the screen. This may be a relatively large ellipse representing the contact between a fingertip and the screen or a small area representing the tip of a stylus, for example.

## Value

A number.

## Examples

This example illustrates using the `Touch` interface's `Touch.radiusX`, `Touch.radiusX` and `Touch.rotationAngle` properties. The `Touch.radiusX` property is the radius of the ellipse which most closely circumscribes the touching area (e.g., finger, stylus) along the axis **indicated** by the touch point's `Touch.rotationAngle`. Likewise, the `Touch.radiusY` property is the radius of the ellipse which most closely circumscribes the touching area (e.g., finger, stylus) along the axis **perpendicular** to that indicated by `Touch.rotationAngle`. The `Touch.rotationAngle` is the angle (in degrees) that the ellipse described by `radiusX` and `radiusY` is rotated clockwise about its center.

The following simple code snippet, registers a single handler for the `touchstart`, `touchmove` and `touchend` events. When the `src` element is touched, the element's width and height will be calculate based on the touch point's `radiusX` and `radiusY` values and the element will then be rotated using the touch point's `rotationAngle`.

```html
<div id="src">…</div>
```

```js
const src = document.getElementById("src");

src.addEventListener("touchstart", rotate);
src.addEventListener("touchmove", rotate);
src.addEventListener("touchend", rotate);

function rotate(e) {
  const touch = e.changedTouches.item(0);

  // Turn off default event handling
  e.preventDefault();

  // Rotate element 'src'.
  src.style.width = `${touch.radiusX * 2}px`;
  src.style.height = `${touch.radiusY * 2}px`;
  src.style.transform = `rotate(${touch.rotationAngle}deg)`;
}
```
