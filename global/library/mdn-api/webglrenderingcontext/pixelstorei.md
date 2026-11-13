---
title: "WebGLRenderingContext: pixelStorei() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webglrenderingcontext/pixelstorei/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGLRenderingContext: pixelStorei() method

The **`WebGLRenderingContext.pixelStorei()`** method of the WebGL API specifies the pixel storage modes.

## Syntax

```js
pixelStorei(pname, param)
```

### Parameters

- `pname`
    A `GLenum` specifying which parameter to set. See below for possible
    values.
- `param`
    A `GLint` specifying a value to set the `pname`
    parameter to. See below for possible values.

### Return value

None (`undefined`).

## Pixel storage parameters

       | Parameter name (for `pname`)
       | Description
       | Type
       | Default value
       | Allowed values (for `param`)
       | Specified in

       | `gl.PACK_ALIGNMENT`
       | Packing of pixel data into memory
       | `GLint`
       | 4
       | 1, 2, 4, 8
       | OpenGL ES 2.0

       | `gl.UNPACK_ALIGNMENT`
       | Unpacking of pixel data from memory.
       | `GLint`
       | 4
       | 1, 2, 4, 8
       | OpenGL ES 2.0

       | `gl.UNPACK_FLIP_Y_WEBGL`
       | Flips the source data along its vertical axis if true.
       | `GLboolean`
       | false
       | true, false
       | WebGL

       | `gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL`
       | Multiplies the alpha channel into the other color channels
       | `GLboolean`
       | false
       | true, false
       | WebGL

       | `gl.UNPACK_COLORSPACE_CONVERSION_WEBGL`
       | Default color space conversion or no color space conversion.
       | `GLenum`
       | `gl.BROWSER_DEFAULT_WEBGL`
       | `gl.BROWSER_DEFAULT_WEBGL`, `gl.NONE`
       | WebGL

When using a `WebGL 2 context`, the
following values are available additionally:

       | Constant
       | Description
       | Type
       | Default value
       | Allowed values (for `param`)
       | Specified in

       | `gl.PACK_ROW_LENGTH`
       | Number of pixels in a row.
       | `GLint`
       | 0
       | 0 to `Infinity`
       | OpenGL ES 3.0

       | `gl.PACK_SKIP_PIXELS`
       |
        Number of pixel locations skipped before the first pixel is written into
        memory.

       | `GLint`
       | 0
       | 0 to `Infinity`
       | OpenGL ES 3.0

       | `gl.PACK_SKIP_ROWS`
       |
        Number of rows of pixel locations skipped before the first pixel is
        written into memory

       | `GLint`
       | 0
       | 0 to `Infinity`
       | OpenGL ES 3.0

       | `gl.UNPACK_ROW_LENGTH`
       | Number of pixels in a row.
       | `GLint`
       | 0
       | 0 to `Infinity`
       | OpenGL ES 3.0

       | `gl.UNPACK_IMAGE_HEIGHT`
       | Image height used for reading pixel data from memory
       | `GLint`
       | 0
       | 0 to `Infinity`
       | OpenGL ES 3.0

       | `gl.UNPACK_SKIP_PIXELS`
       |
        Number of pixel images skipped before the first pixel is read from
        memory

       | `GLint`
       | 0
       | 0 to `Infinity`
       | OpenGL ES 3.0

       | `gl.UNPACK_SKIP_ROWS`
       |
        Number of rows of pixel locations skipped before the first pixel is read
        from memory

       | `GLint`
       | 0
       | 0 to `Infinity`
       | OpenGL ES 3.0

       | `gl.UNPACK_SKIP_IMAGES`
       |
        Number of pixel images skipped before the first pixel is read from
        memory

       | `GLint`
       | 0
       | 0 to `Infinity`
       | OpenGL ES 3.0

## Examples

Setting the pixel storage mode affects the
`WebGLRenderingContext.readPixels()` operations, as well as unpacking of
textures with the `WebGLRenderingContext.texImage2D()` and
`WebGLRenderingContext.texSubImage2D()` methods.

```js
const tex = gl.createTexture();
gl.bindTexture(gl.TEXTURE_2D, tex);
gl.pixelStorei(gl.PACK_ALIGNMENT, 4);
```

To check the values for packing and unpacking of pixel data, you can query the same
pixel storage parameters with `WebGLRenderingContext.getParameter()`.

```js
gl.getParameter(gl.PACK_ALIGNMENT);
gl.getParameter(gl.UNPACK_ALIGNMENT);
```

## See also

- `WebGLRenderingContext.readPixels()`
- `WebGLRenderingContext.texImage2D()`
- `WebGLRenderingContext.texSubImage2D()`
