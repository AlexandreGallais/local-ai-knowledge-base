---
title: "OES_texture_float_linear extension"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/oes_texture_float_linear/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# OES_texture_float_linear extension

The **`OES_texture_float_linear`** extension is part of the WebGL API and allows linear filtering with floating-point pixel types for textures.

WebGL extensions are available using the `WebGLRenderingContext.getExtension()` method.
For more information, see Using WebGL extensions.

> **Note:**
> This extension is available to both, `WebGL1` and `WebGL2` contexts.

## Linear filtering

The `OES_texture_float` extension alone does not allow linear filtering with floating-point textures. This extension enables this ability.

With the help of this extension, you can now set the magnification or minification filter in the `WebGLRenderingContext.texParameter()` method to one of `gl.LINEAR`, `gl.LINEAR_MIPMAP_NEAREST`, `gl.NEAREST_MIPMAP_LINEAR`, or `gl.LINEAR_MIPMAP_LINEAR`, and use floating-point textures.

## Examples

```js
gl.getExtension("OES_texture_float");
gl.getExtension("OES_texture_float_linear");

const texture = gl.createTexture();
gl.bindTexture(gl.TEXTURE_2D, texture);

gl.texParameterf(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.FLOAT, image);
```

## See also

- `WebGLRenderingContext.getExtension()`
- `WebGLRenderingContext.texImage2D()`
- `WebGLRenderingContext.texSubImage2D()`
- `OES_texture_float`
- `OES_texture_half_float`
- `OES_texture_half_float_linear`
