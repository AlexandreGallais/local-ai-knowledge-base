---
title: "OES_texture_float extension"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/oes_texture_float/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# OES_texture_float extension

The **`OES_texture_float`** extension is part of the WebGL API and exposes floating-point pixel types for textures.

WebGL extensions are available using the `WebGLRenderingContext.getExtension()` method.
For more information, see Using WebGL extensions.

> **Note:**
> This extension is only available to `WebGL1` contexts. In `WebGL2`, floating-point texture formats and the `gl.FLOAT` texture data type are available by default (and you must pair it with a sized internal format such as `gl.RGBA32F`).
>
> In WebGL 2, you still need extensions to make a floating-point texture color-renderable: use the `EXT_color_buffer_float` extension for floating-point color buffers, or `EXT_color_buffer_half_float` when 16-bit floating-point render targets are supported but 32-bit floating-point render targets are not.

## Extended methods

This extension extends `WebGLRenderingContext.texImage2D()` and `WebGLRenderingContext.texSubImage2D()`:

- The `type` parameter now accepts `gl.FLOAT`.
- The `pixels` parameter now accepts a `Float32Array`.

## Limitation: Linear filtering

Linear filtering on floating-point textures is not allowed with this extension. If you set the magnification or minification filter in the `WebGLRenderingContext.texParameter()` method to one of `gl.LINEAR`, `gl.LINEAR_MIPMAP_NEAREST`, `gl.NEAREST_MIPMAP_LINEAR`, or `gl.LINEAR_MIPMAP_LINEAR`, and use floating-point textures, the texture will be marked as incomplete.

To use linear filtering on floating-point textures, enable the `OES_texture_float_linear` extension in addition to this extension.

## Floating-point color buffers

In WebGL 1, this extension implicitly enables the `WEBGL_color_buffer_float` extension (if supported), which allows rendering to 32-bit floating-point color buffers.

In WebGL 2, use the `EXT_color_buffer_float` extension for floating-point color buffers instead.

## Examples

```js
const ext = gl.getExtension("OES_texture_float");

const texture = gl.createTexture();
gl.bindTexture(gl.TEXTURE_2D, texture);

gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.FLOAT, image);
```

## See also

- `WebGLRenderingContext.getExtension()`
- `WebGLRenderingContext.texImage2D()`
- `WebGLRenderingContext.texSubImage2D()`
- `OES_texture_float_linear`
- `OES_texture_half_float`
- `OES_texture_half_float_linear`
