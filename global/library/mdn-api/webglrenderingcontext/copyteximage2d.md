---
title: "WebGLRenderingContext: copyTexImage2D() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webglrenderingcontext/copyteximage2d/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGLRenderingContext: copyTexImage2D() method

The **`copyTexImage2D()`** method of the `WebGLRenderingContext` interface of the WebGL API copies pixels from the current `WebGLFramebuffer` into a 2D texture image.

## Syntax

```js
copyTexImage2D(target, level, internalformat, x, y, width, height, border)
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
- `internalformat`
    A `GLenum` specifying how the texture should be stored after it's loaded. Possible values:
    - `gl.ALPHA`: Discards the red, green and blue components and reads the alpha component.
    - `gl.RGB`: Discards the alpha components and reads the red, green and blue components.
    - `gl.RGBA`: Red, green, blue and alpha components are read from the color buffer.
    - `gl.LUMINANCE`: Each color component is a luminance component, alpha is 1.0.
    - `gl.LUMINANCE_ALPHA`: Each component is a luminance/alpha component.
- `x`
    A `GLint` specifying the x coordinate of the lower left corner where to start copying.
- `y`
    A `GLint` specifying the y coordinate of the lower left corner where to start copying.
- `width`
    A `GLsizei` specifying the width of the texture in texels.
- `height`
    A `GLsizei` specifying the height of the texture in texels.
- `border`
    A `GLint` specifying the width of the border. Must be 0.

### Return value

None (`undefined`).

## Examples

```js
gl.copyTexImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 0, 0, 512, 512, 0);
```

## See also

- `WebGLRenderingContext.createTexture()`
- `WebGLRenderingContext.bindTexture()`
- `WebGLRenderingContext.texImage2D()`
- `WebGLRenderingContext.texSubImage2D()`
- `WebGLRenderingContext.compressedTexImage2D()`
