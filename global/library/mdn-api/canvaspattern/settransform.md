---
title: "CanvasPattern: setTransform() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/canvaspattern/settransform/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CanvasPattern: setTransform() method

The **`CanvasPattern.setTransform()`** method uses a `DOMMatrix` object as the pattern's transformation matrix and invokes it on the pattern.

## Syntax

```js
setTransform(matrix)
```

### Parameters

- `matrix`
    A `DOMMatrix` to use as the pattern's transformation matrix.

### Return value

None (`undefined`).

## Examples

### Using the `setTransform` method

This is a code snippet which uses the `setTransform` method to
create a `CanvasPattern` with the specified pattern transformation from a
`DOMMatrix`. The pattern gets applied if you set it as the current
`fillStyle` and gets drawn onto the
canvas when using the `fillRect()`
method, for example.

```html
<canvas id="canvas"></canvas>
```

```js
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const matrix = new DOMMatrix([1, 0.2, 0.8, 1, 0, 0]);

const img = new Image();
img.src = "canvas_create_pattern.png";

img.onload = () => {
  const pattern = ctx.createPattern(img, "repeat");
  pattern.setTransform(matrix.rotate(-45).scale(1.5));
  ctx.fillStyle = pattern;
  ctx.fillRect(0, 0, 400, 400);
};
```

## See also

- The interface defining this method: `CanvasPattern`
- `DOMMatrix`
