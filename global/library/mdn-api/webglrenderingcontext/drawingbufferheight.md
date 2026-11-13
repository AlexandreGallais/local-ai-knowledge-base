---
title: "WebGLRenderingContext: drawingBufferHeight property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webglrenderingcontext/drawingbufferheight/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGLRenderingContext: drawingBufferHeight property

The read-only **`WebGLRenderingContext.drawingBufferHeight`**
property represents the actual height of the current drawing buffer. It should match the
`height` attribute of the `<canvas>` element associated with
this context, but might differ if the implementation is not able to provide the
requested height.

## Value

A number.

## Examples

Given this `<canvas>` element:

```html
<canvas id="canvas"></canvas>
```

You can get the height of the drawing buffer with the following lines:

```js
const canvas = document.getElementById("canvas");
const gl = canvas.getContext("webgl");
gl.drawingBufferHeight; // 150
```

## See also

- `WebGLRenderingContext.drawingBufferWidth`
- `WebGLRenderingContext.viewport()`
