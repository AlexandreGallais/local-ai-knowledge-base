---
title: "CanvasRenderingContext2D: getLineDash() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/canvasrenderingcontext2d/getlinedash/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CanvasRenderingContext2D: getLineDash() method

The **`getLineDash()`** method of the Canvas 2D API's
`CanvasRenderingContext2D` interface gets the current line dash pattern.

## Syntax

```js
getLineDash()
```

### Parameters

None.

### Return value

An `Array` of numbers that specify distances to alternately draw a line and
a gap (in coordinate space units). If the number, when setting the elements, is odd, the
elements of the array get copied and concatenated. For example, setting the line dash to
`[5, 15, 25]` will result in getting back
`[5, 15, 25, 5, 15, 25]`.

## Examples

### Getting the current line dash setting

This example demonstrates the `getLineDash()` method.

#### HTML

```html
<canvas id="canvas"></canvas>
```

#### JavaScript

As set by `setLineDash()`,
strokes consist of lines that are 10 units wide, with spaces of 20 units in between each
line.

```js
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

ctx.setLineDash([10, 20]);
console.log(ctx.getLineDash()); // [10, 20]

// Draw a dashed line
ctx.beginPath();
ctx.moveTo(0, 50);
ctx.lineTo(300, 50);
ctx.stroke();
```

#### Result

## See also

- The interface defining this method: `CanvasRenderingContext2D`
- `CanvasRenderingContext2D.setLineDash()`
- `CanvasRenderingContext2D.lineDashOffset`
