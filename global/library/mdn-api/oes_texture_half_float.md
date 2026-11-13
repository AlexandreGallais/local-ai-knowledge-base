---
title: "OES_texture_half_float extension"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/oes_texture_half_float/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# OES_texture_half_float extension

The **`OES_texture_half_float`** extension is part of the WebGL API and adds texture formats with 16- (aka half float) and 32-bit floating-point components.

WebGL extensions are available using the `WebGLRenderingContext.getExtension()` method.
For more information, see Using WebGL extensions.

> **Note:**
> This extension is only available to `WebGL1` contexts. In `WebGL2`, the functionality of this extension is available on the WebGL2 context by default. The constant in WebGL2 is `gl.HALF_FLOAT`.

## Constants

- `ext.HALF_FLOAT_OES`
    Half floating-point type (16-bit).

## Extended methods

This extension extends `WebGLRenderingContext.texImage2D()` and `WebGLRenderingContext.texSubImage2D()`:

- The `type` parameter now accepts `ext.HALF_FLOAT_OES`.

## Limitation: Linear filtering

Linear filtering on half floating-point textures is not allowed with this extension. If you set the magnification or minification filter in the `WebGLRenderingContext.texParameter()` method to one of `gl.LINEAR`, `gl.LINEAR_MIPMAP_NEAREST`, `gl.NEAREST_MIPMAP_LINEAR`, or `gl.LINEAR_MIPMAP_LINEAR`, and use half floating-point textures, the texture will be marked as incomplete.

To use linear filtering on half floating-point textures, enable the `OES_texture_half_float_linear` extension in addition to this extension.

## Half floating-point color buffers

This extension implicitly enables the `EXT_color_buffer_half_float` extension (if supported), which allows rendering to 16-bit floating point formats.

## Examples

```js
const ext = gl.getExtension("OES_texture_half_float");

const texture = gl.createTexture();
gl.bindTexture(gl.TEXTURE_2D, texture);

gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, ext.HALF_FLOAT_OES, image);
```

## See also

- `WebGLRenderingContext.getExtension()`
- `WebGLRenderingContext.texImage2D()`
- `WebGLRenderingContext.texSubImage2D()`
- `OES_texture_float`
- `OES_texture_float_linear`
- `OES_texture_half_float_linear`
