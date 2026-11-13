---
title: "WebGLRenderingContext: drawingBufferColorSpace property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webglrenderingcontext/drawingbuffercolorspace/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGLRenderingContext: drawingBufferColorSpace property

The **`WebGLRenderingContext.drawingBufferColorSpace`** property specifies the color space of the WebGL drawing buffer. Along with the default (`srgb`), the `display-p3` color space can be used.

See `WebGLRenderingContext.unpackColorSpace` for specifying the color space for textures.

## Value

This property can have the following values:

- `"srgb"` selects the sRGB color space. This is the default value.
- `"display-p3"` selects the display-p3 color space.

If an invalid value is specified, then the value of `drawingBufferColorSpace` will remain unchanged.

## Examples

### Setting the drawing buffer color space to draw a Display P3 red

```js
const canvas = document.getElementById("canvas");
const gl = canvas.getContext("webgl");
gl.drawingBufferColorSpace = "display-p3";
gl.clearColor(1, 0, 0, 1);
gl.clear(gl.COLOR_BUFFER_BIT);
```

## See also

- `WebGLRenderingContext.unpackColorSpace`
