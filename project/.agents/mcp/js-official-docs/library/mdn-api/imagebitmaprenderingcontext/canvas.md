---
title: "ImageBitmapRenderingContext: canvas property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/imagebitmaprenderingcontext/canvas/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ImageBitmapRenderingContext: canvas property

The **`ImageBitmapRenderingContext.canvas`** property, part of the
Canvas API, is a read-only reference to the
`HTMLCanvasElement` or `OffscreenCanvas` object that is associated with the given context.

## Value

A `HTMLCanvasElement` or `OffscreenCanvas` object.

## Examples

Given this `<canvas>` element:

```html
<canvas id="canvas"></canvas>
```

You can get a reference to the canvas element within the `ImageBitmapRenderingContext` by using the `canvas` property:

```js
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("bitmaprenderer");
console.log(ctx.canvas === canvas); // true
```

## See also

- `ImageBitmapRenderingContext` interface
- Canvas API
