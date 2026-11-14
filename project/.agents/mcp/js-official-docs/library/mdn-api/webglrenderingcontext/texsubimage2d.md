---
title: "WebGLRenderingContext: texSubImage2D() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webglrenderingcontext/texsubimage2d/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGLRenderingContext: texSubImage2D() method

The **`texSubImage2D()`** method of the `WebGLRenderingContext` interface of the WebGL API specifies a two-dimensional sub-rectangle for a texture image.

## Syntax

```js
// WebGL 1:
texSubImage2D(target, level, xoffset, yoffset, width, height, format, type, srcData)
texSubImage2D(target, level, xoffset, yoffset, format, type, source)

// Additionally available in WebGL 2:
texSubImage2D(target, level, xoffset, yoffset, width, height, format, type, srcData, srcOffset)
texSubImage2D(target, level, xoffset, yoffset, width, height, format, type, source)
texSubImage2D(target, level, xoffset, yoffset, width, height, format, type, offset)
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
    A `GLint` specifying the lower left texel x coordinate of a width-wide by height-wide rectangular subregion of the texture array.
- `yoffset`
    A `GLint` specifying the lower left texel y coordinate of a width-wide by height-wide rectangular subregion of the texture array.
- `width`
    A `GLsizei` specifying the width of the texture in texels.
- `height`
    A `GLsizei` specifying the height of the texture in texels.
- `format`
    A `GLenum` specifying how each integer element in the raw texel data should be interpreted as color components. Possible values:
    - `gl.ALPHA`: Discards the red, green and blue components and reads the alpha component.
    - `gl.RGB`: Discards the alpha components and reads the red, green and blue components.
    - `gl.RGBA`: Red, green, blue and alpha components are read from the color buffer.
    - `gl.LUMINANCE`: Each color component is a luminance component, alpha is 1.0.
    - `gl.LUMINANCE_ALPHA`: Each component is a luminance/alpha component.

    When using the `EXT_sRGB` extension:
    - `ext.SRGB_EXT`
    - `ext.SRGB_ALPHA_EXT`

    When using a `WebGL2RenderingContext`, the following values are available additionally:
    - `gl.RED`
    - `gl.RED_INTEGER`
    - `gl.RG`
    - `gl.RG_INTEGER`
    - `gl.RGB_INTEGER`
    - `gl.RGBA_INTEGER`
    - `gl.DEPTH_COMPONENT`
    - `gl.DEPTH_STENCIL`

- `type`
    A `GLenum` specifying the size of each integer element in the raw texel data. For the combinations of `format` and `type` available, see `WebGLRenderingContext.texImage2D()`.

The texture source can be provided in one of three ways: from an `ArrayBuffer` (possibly shared) using `srcData` and `srcOffset`; from a DOM pixel `source`; or, in WebGL 2, from `gl.PIXEL_UNPACK_BUFFER` using `offset`.

- `srcData`
    A `TypedArray` or `DataView` containing the compressed texture data. Its type must match the `type` parameter; see `WebGLRenderingContext.texImage2D()`.
- `srcOffset` (optional)
    (WebGL 2 only) An integer specifying the index of `srcData` to start reading from. Defaults to `0`.
- `source`
    Read from a DOM pixel source, which can be one of:
    - `ImageBitmap`
    - `ImageData`
    - `HTMLImageElement`
    - `HTMLCanvasElement`
    - `HTMLVideoElement`
    - `OffscreenCanvas`
    - `VideoFrame`

    In WebGL 1, the `width` and `height` are always inferred from the source. In WebGL 2, they can also be explicitly specified.

- `offset`
    (WebGL 2 only) A `GLintptr` specifying the starting address in the buffer bound to `gl.PIXEL_UNPACK_BUFFER`.

### Return value

None (`undefined`).

## Examples

```js
gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, gl.RGBA, gl.UNSIGNED_BYTE, image);
```

## See also

- `WebGLRenderingContext.createTexture()`
- `WebGLRenderingContext.bindTexture()`
- `WebGLRenderingContext.texImage2D()`
- `WebGLRenderingContext.compressedTexImage2D()`
- `WebGLRenderingContext.copyTexImage2D()`
- `WebGLRenderingContext.getTexParameter()`
- `OES_texture_float`
- `OES_texture_half_float`
- `EXT_sRGB`
- `EXT_texture_norm16`
