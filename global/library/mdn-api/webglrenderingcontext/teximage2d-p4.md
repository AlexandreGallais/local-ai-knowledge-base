---
title: "WebGLRenderingContext: texImage2D() method (part 4 of 4)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webglrenderingcontext/teximage2d/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGLRenderingContext: texImage2D() method (part 4 of 4)

| `internalformat`     | `format`          | `type`                                              | Internal pixel layout |
    | -------------------- | ----------------- | --------------------------------------------------- | --------------------- |
    | `DEPTH_COMPONENT16`  | `DEPTH_COMPONENT` | `UNSIGNED_SHORT`, `UNSIGNED_INT`                    | (D) = (16)            |
    | `DEPTH_COMPONENT24`  | `DEPTH_COMPONENT` | `UNSIGNED_INT`                                      | (D) = (24)            |
    | `DEPTH_COMPONENT32F` | `DEPTH_COMPONENT` | `FLOAT`                                             | (D) = (f32)           |
    | `DEPTH24_STENCIL8`   | `DEPTH_STENCIL`   | `UNSIGNED_INT_24_8` (`ext.UNSIGNED_INT_24_8_WEBGL`) | (D, S) = (24, 8)      |
    | `DEPTH32F_STENCIL8`  | `DEPTH_STENCIL`   | `FLOAT_32_UNSIGNED_INT_24_8_REV`                    | (D, S) = (f32, 8)     |

    When the data source is a DOM pixel source, commonly each channel's representation is an unsigned integer type of at least 8 bits. Converting such representation to signed integers or unsigned integers with more bits is not clearly defined. For example, when converting `RGBA8` to `RGBA16UI`, it is unclear whether or not the intention is to scale up values to the full range of a 16-bit unsigned integer. Therefore, only converting to unsigned integer of at most 8 bits, half float, or float is allowed.

The texture source can be provided in one of three ways: from an `ArrayBuffer` (possibly shared) using `srcData` and `srcOffset`; from a DOM pixel `source`; or, in WebGL 2, from `gl.PIXEL_UNPACK_BUFFER` using `offset`.

- `srcData`
    A `TypedArray` or `DataView` containing the compressed texture data. Its type must match the `type` parameter:

    | `srcData` type                                            | `type` value                                                                                                                   |
    | --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
    | `Int8Array`                                   | `BYTE`                                                                                                                         |
    | `Uint8Array`, `Uint8ClampedArray` | `UNSIGNED_BYTE`                                                                                                                |
    | `Int16Array`                                  | `SHORT`                                                                                                                        |
    | `Uint16Array`                                 | `UNSIGNED_SHORT`, `UNSIGNED_SHORT_5_6_5`, `UNSIGNED_SHORT_5_5_5_1`, `UNSIGNED_SHORT_4_4_4_4`, `HALF_FLOAT`                     |
    | `Int32Array`                                  | `INT`                                                                                                                          |
    | `Uint32Array`                                 | `UNSIGNED_INT`, `UNSIGNED_INT_5_9_9_9_REV`, `UNSIGNED_INT_2_10_10_10_REV`, `UNSIGNED_INT_10F_11F_11F_REV`, `UNSIGNED_INT_24_8` |
    | `Float32Array`                                | `FLOAT`                                                                                                                        |

    When `type` is `FLOAT_32_UNSIGNED_INT_24_8_REV`, `srcData` must be `null`.

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
gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
```

## See also

- `WebGLRenderingContext.createTexture()`
- `WebGLRenderingContext.bindTexture()`
- `WebGLRenderingContext.texSubImage2D()`
- `WebGLRenderingContext.compressedTexImage2D()`
- `WebGLRenderingContext.copyTexImage2D()`
- `WebGLRenderingContext.getTexParameter()`
- `WEBGL_depth_texture`
- `OES_texture_float`
- `OES_texture_half_float`
- `EXT_texture_norm16`
- `EXT_sRGB`
