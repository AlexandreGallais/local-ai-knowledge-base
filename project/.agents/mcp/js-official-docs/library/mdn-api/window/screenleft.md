---
title: "Window: screenLeft property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/window/screenleft/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Window: screenLeft property

The **`screenLeft`** read-only property of the `Window` interface returns the horizontal distance, in CSS pixels, from the left border of the user's browser window to the left side of the screen.

> **Note:**
> `screenLeft` is an alias of the older `Window.screenX` property. `screenLeft` was originally supported only in IE but was introduced everywhere due to popularity.

## Value

A number equal to the number of CSS pixels from the left edge of the browser window to the left edge of the screen.

## Examples

In our screenleft-screentop example, you'll see a canvas onto which has been drawn a circle. In this example we are using `screenLeft`/`screenTop` plus `Window.requestAnimationFrame()` to constantly redraw the circle in the same physical position on the screen, even if the window position is moved.

This example compensates for changes in the browser window's position, but not for changes in the viewport's position within the window. Showing or hiding a toolbar or sidebar can therefore shift the circle on the screen.

```js
let initialLeft = window.screenLeft + canvasElem.offsetLeft;
let initialTop = window.screenTop + canvasElem.offsetTop;

function positionElem() {
  let newLeft = window.screenLeft + canvasElem.offsetLeft;
  let newTop = window.screenTop + canvasElem.offsetTop;

  let leftUpdate = initialLeft - newLeft;
  let topUpdate = initialTop - newTop;

  ctx.fillStyle = "rgb(0 0 0)";
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = "rgb(0 0 255)";
  ctx.beginPath();
  ctx.arc(
    leftUpdate + width / 2,
    topUpdate + height / 2 + 35,
    50,
    degToRad(0),
    degToRad(360),
    false,
  );
  ctx.fill();

  pElem.textContent = `Window.screenLeft: ${window.screenLeft}, Window.screenTop: ${window.screenTop}`;

  window.requestAnimationFrame(positionElem);
}

window.requestAnimationFrame(positionElem);
```

## See also

- `window.screenTop`
- `window.screenX`
