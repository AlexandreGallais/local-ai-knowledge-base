---
title: "CanvasRenderingContext2D: getTransform() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/canvasrenderingcontext2d/gettransform/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CanvasRenderingContext2D: getTransform() method

The **`CanvasRenderingContext2D.getTransform()`** method of the Canvas 2D API retrieves the current transformation matrix being applied to the context.

## Syntax

```js
getTransform()
```

### Parameters

None.

### Return value

A `DOMMatrix` object.

The transformation matrix is described by:

<math display="block">
  <semantics><mrow><mo>[</mo><mtable columnalign="center center center" rowspacing="0.5ex"><mtr><mtd><mi>a</mi></mtd><mtd><mi>c</mi></mtd><mtd><mi>e</mi></mtd></mtr><mtr><mtd><mi>b</mi></mtd><mtd><mi>d</mi></mtd><mtd><mi>f</mi></mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>1</mn></mtd></mtr></mtable><mo>]</mo></mrow><annotation encoding="TeX">\left[ \begin{array}{ccc} a & c & e \\ b & d & f \\ 0 & 0 & 1 \end{array} \right]</annotation></semantics>
</math>

> **Note:**
> The returned object is not live, so updating it will not
> affect the current transformation matrix, and updating the current transformation
> matrix will not affect an already returned `DOMMatrix`.

## Examples

In the following example, we have two `<canvas>` elements. We apply a
transform to the first one's context using
`CanvasRenderingContext2D.setTransform()` and draw a square on it, then
retrieve the matrix from it using `getTransform()`.

We then apply the retrieved matrix directly to the second canvas context by passing the
`DOMMatrix` object directly to `setTransform()`, and draw a circle
on it.

### HTML

```html
<canvas width="240"></canvas> <canvas width="240"></canvas>
```

### CSS

```css
canvas {
  border: 1px solid black;
}
```

### JavaScript

```js
const canvases = document.querySelectorAll("canvas");
const ctx1 = canvases[0].getContext("2d");
const ctx2 = canvases[1].getContext("2d");

ctx1.setTransform(1, 0.2, 0.8, 1, 0, 0);
ctx1.fillRect(25, 25, 50, 50);

let storedTransform = ctx1.getTransform();
console.log(storedTransform);

ctx2.setTransform(storedTransform);
ctx2.beginPath();
ctx2.arc(50, 50, 50, 0, 2 * Math.PI);
ctx2.fill();
```

## See also

- The interface defining this method: `CanvasRenderingContext2D`
- `CanvasRenderingContext2D.transform()`
