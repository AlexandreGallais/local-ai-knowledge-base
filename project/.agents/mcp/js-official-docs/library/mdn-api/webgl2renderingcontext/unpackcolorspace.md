---
title: "WebGL2RenderingContext: unpackColorSpace property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webgl2renderingcontext/unpackcolorspace/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGL2RenderingContext: unpackColorSpace property

The **`WebGL2RenderingContext.unpackColorSpace`** property specifies the color space to convert to when importing textures. Along with the default (`srgb`), the `display-p3` color space can be used.

Texture image sources can be the following:

- `ImageBitmap`
- `ImageData`
- `HTMLImageElement`
- `HTMLCanvasElement`
- `HTMLVideoElement`
- `OffscreenCanvas`
- `VideoFrame`

Textures are imported using the `WebGLRenderingContext.texImage2D()` and `WebGLRenderingContext.texSubImage2D()` methods and conversion to the specified `unpackColorSpace` color space happens during import.

Note that this doesn't apply to `HTMLImageElement` when the `UNPACK_COLORSPACE_CONVERSION_WEBGL` pixel storage parameter is set to `NONE`.

## Value

This property can have the following values:

- `"srgb"` selects the sRGB color space. This is the default value.
- `"display-p3"` selects the display-p3 color space.

If an invalid value is specified, then the value of `unpackColorSpace` will remain unchanged.

## Examples

### Converting sRGB ImageData to display-p3 in a texture

```js
const canvas = document.getElementById("canvas");
const gl = canvas.getContext("webgl");

gl.drawingBufferColorSpace = "display-p3";
gl.unpackColorSpace = "display-p3";

// Some sRGB ImageData
// Will be converted from sRGB to Display P3
const imageData = new ImageData(data, 32, 32);

const tex = gl.createTexture();
gl.bindTexture(gl.TEXTURE_2D, tex);
gl.texImage2D(
  gl.TEXTURE_2D,
  0,
  gl.RGBA,
  width,
  height,
  0,
  gl.RGBA,
  gl.UNSIGNED_BYTE,
  imageData,
);
```

## See also

- `WebGL2RenderingContext.drawingBufferColorSpace`
