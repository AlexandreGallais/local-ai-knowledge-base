---
title: "WebGLRenderingContext: canvas property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webglrenderingcontext/canvas/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGLRenderingContext: canvas property

The **`WebGLRenderingContext.canvas`** property is a read-only
reference to the `HTMLCanvasElement` or `OffscreenCanvas`
object that is associated with the context. It might be `null` if it is not
associated with a `<canvas>` element or an `OffscreenCanvas`
object.

## Value

Either a `HTMLCanvasElement` or `OffscreenCanvas` object or
`null`.

## Examples

### Canvas element

Given this `<canvas>` element:

```html
<canvas id="canvas"></canvas>
```

You can get back a reference to it from the `WebGLRenderingContext` using
the `canvas` property:

```js
const canvas = document.getElementById("canvas");
const gl = canvas.getContext("webgl");
gl.canvas; // HTMLCanvasElement
```

### Offscreen canvas

Example using the experimental `OffscreenCanvas` object.

```js
const offscreen = new OffscreenCanvas(256, 256);
const gl = offscreen.getContext("webgl");
gl.canvas; // OffscreenCanvas
```

## See also

- `CanvasRenderingContext2D.canvas`
- The `OffscreenCanvas` interface
