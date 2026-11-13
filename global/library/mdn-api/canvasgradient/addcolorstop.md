---
title: "CanvasGradient: addColorStop() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/canvasgradient/addcolorstop/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CanvasGradient: addColorStop() method

The **`CanvasGradient.addColorStop()`** method adds a new color stop,
defined by an `offset` and a `color`, to a given canvas gradient.

## Syntax

```js
addColorStop(offset, color)
```

### Parameters

- `offset`
    A number between `0` and `1`, inclusive, representing the
    position of the color stop. `0` represents the start of the gradient and
    `1` represents the end.
- `color`
    A CSS `<color>` value
    representing the color of the stop.

### Return value

None (`undefined`).

### Exceptions

- `IndexSizeError` `DOMException`
    Thrown if `offset` is not between 0 and 1 (both included).
- `SyntaxError` `DOMException`
    Thrown if `color` cannot be parsed as a CSS `<color>` value.

## Examples

### Adding stops to a gradient

This example uses the `addColorStop` method to add stops to a linear
`CanvasGradient` object. The gradient is then used to fill a rectangle.

#### HTML

```html
<canvas id="canvas"></canvas>
```

#### JavaScript

```js
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let gradient = ctx.createLinearGradient(0, 0, 200, 0);
gradient.addColorStop(0, "green");
gradient.addColorStop(0.7, "white");
gradient.addColorStop(1, "pink");
ctx.fillStyle = gradient;
ctx.fillRect(10, 10, 200, 100);
```

#### Result

## See also

- The interface defining this method: `CanvasGradient`
- `CanvasRenderingContext2D.createLinearGradient()`
- `CanvasRenderingContext2D.createRadialGradient()`
