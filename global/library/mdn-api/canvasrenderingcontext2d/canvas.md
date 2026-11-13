---
title: "CanvasRenderingContext2D: canvas property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/canvasrenderingcontext2d/canvas/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CanvasRenderingContext2D: canvas property

The **`CanvasRenderingContext2D.canvas`** property, part of the
Canvas API, is a read-only reference to the
`HTMLCanvasElement` object that is associated with a given context.

## Value

A `HTMLCanvasElement` object.

## Examples

Given this `<canvas>` element:

```html
<canvas id="canvas"></canvas>
```

… you can get a reference to the canvas element within the
`CanvasRenderingContext2D` by using the `canvas` property:

```js
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.canvas; // HTMLCanvasElement
```

## See also

- `CanvasRenderingContext2D` interface
- Canvas API
