---
title: "WebGL2RenderingContext: copyTexSubImage3D() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webgl2renderingcontext/copytexsubimage3d/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGL2RenderingContext: copyTexSubImage3D() method

The **`copyTexSubImage3D()`** method of the `WebGL2RenderingContext` interface of the WebGL API copies pixels from the current `WebGLFramebuffer` into a 3D texture sub-image.

## Syntax

```js
copyTexSubImage3D(target, level, xoffset, yoffset, zoffset, x, y, width, height)
```

### Parameters

- `target`
    A `GLenum` specifying the binding point (target) of the active texture. Possible values:
    - `gl.TEXTURE_3D`: A three-dimensional texture.
    - `gl.TEXTURE_2D_ARRAY`: A two-dimensional array texture.
- `level`
    A `GLint` specifying the level of detail. Level 0 is the base image level and level _n_ is the n-th mipmap reduction level.
- `xoffset`
    A `GLint` specifying the x offset within the texture image.
- `yoffset`
    A `GLint` specifying the y offset within the texture image.
- `zoffset`
    A `GLint` specifying the z offset within the texture image.
- `x`
    A `GLint` specifying the x coordinate of the lower left corner where to start copying.
- `y`
    A `GLint` specifying the y coordinate of the lower left corner where to start copying.
- `width`
    A `GLsizei` specifying the width of the texture in texels.
- `height`
    A `GLsizei` specifying the height of the texture in texels.

### Return value

None (`undefined`).

## Examples

```js
gl.copyTexSubImage3D(gl.TEXTURE_3D, 0, 0, 0, 0, 0, 0, 16, 16);
```

## See also

- `WebGLRenderingContext.copyTexImage2D()`
- `WebGLRenderingContext.texImage2D()`
- `WebGLRenderingContext.texSubImage2D()`
- `WebGLRenderingContext.compressedTexImage2D()`
