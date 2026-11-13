---
title: "WebGLRenderingContext: copyTexSubImage2D() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webglrenderingcontext/copytexsubimage2d/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGLRenderingContext: copyTexSubImage2D() method

The **`copyTexSubImage2D()`** method of the `WebGLRenderingContext` interface of the WebGL API copies pixels from the current `WebGLFramebuffer` into a 2D texture sub-image.

## Syntax

```js
copyTexSubImage2D(target, level, xoffset, yoffset, x, y, width, height)
```

### Parameters

- `target`
    A `GLenum` specifying the binding point (target) of the active texture. Possible values:
    - `gl.TEXTURE_2D`: A two-dimensional texture.
    - `gl.TEXTURE_CUBE_MAP_POSITIVE_X`: Positive X face for a cube-mapped texture.
    - `gl.TEXTURE_CUBE_MAP_NEGATIVE_X`: Negative X face for a cube-mapped texture.
    - `gl.TEXTURE_CUBE_MAP_POSITIVE_Y`: Positive Y face for a cube-mapped texture.
    - `gl.TEXTURE_CUBE_MAP_NEGATIVE_Y`: Negative Y face for a cube-mapped texture.
    - `gl.TEXTURE_CUBE_MAP_POSITIVE_Z`: Positive Z face for a cube-mapped texture.
    - `gl.TEXTURE_CUBE_MAP_NEGATIVE_Z`: Negative Z face for a cube-mapped texture.
- `level`
    A `GLint` specifying the level of detail. Level 0 is the base image level and level _n_ is the n-th mipmap reduction level.
- `xoffset`
    A `GLint` specifying the horizontal offset within the texture image.
- `yoffset`
    A `GLint` specifying the vertical offset within the texture image.
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
gl.copyTexSubImage2D(gl.TEXTURE_2D, 0, 0, 0, 0, 0, 16, 16);
```

## See also

- `WebGLRenderingContext.copyTexImage2D()`
- `WebGLRenderingContext.texImage2D()`
- `WebGLRenderingContext.texSubImage2D()`
- `WebGLRenderingContext.compressedTexImage2D()`
