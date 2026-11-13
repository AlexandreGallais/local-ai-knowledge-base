---
title: "OES_draw_buffers_indexed: blendFuncSeparateiOES() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/oes_draw_buffers_indexed/blendfuncseparateioes/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# OES_draw_buffers_indexed: blendFuncSeparateiOES() method

The `blendFuncSeparateiOES()` method of the `OES_draw_buffers_indexed` WebGL extension defines which function is used when blending pixels for RGB and alpha components separately for a particular draw buffer.

See `OES_draw_buffers_indexed.blendFunciOES()` for setting RGB and alpha together and `WebGLRenderingContext.blendFuncSeparate()` for the WebGL 1 version of this method.

## Syntax

```js
blendFuncSeparateiOES(buf, srcRGB, dstRGB, srcAlpha, dstAlpha)
```

### Parameters

- `buf`
    An integer `i` specifying the draw buffer associated with the constant `gl.DRAW_BUFFERi`, see WebGL draw buffer constants.
- `srcRGB`
    A `GLenum` specifying a multiplier for the red, green and blue (RGB) source blending factors. Accepts the same enums as the `srcRGB` parameter in `WebGLRenderingContext.blendFuncSeparate()`.
- `dstRGB`
    A `GLenum` specifying a multiplier for the red, green and blue (RGB) destination blending factors. Accepts the same enums as the `dstRGB` parameter in `WebGLRenderingContext.blendFuncSeparate()`.
- `srcAlpha`
    A `GLenum` specifying a multiplier for the alpha source blending factor. Accepts the same enums as the `srcAlpha` parameter in `WebGLRenderingContext.blendFuncSeparate()`.
- `dstAlpha`
    A `GLenum` specifying a multiplier for the alpha destination blending factor. Accepts the same enums as the `srcAlpha` parameter in `WebGLRenderingContext.blendFuncSeparate()`.

### Return value

None (`undefined`).

### Exceptions

- If `buf` is not a valid value, a `gl.INVALID_VALUE` error is thrown.
- If `srcRGB`, `dstRGB`, `srcAlpha` or `dstAlpha` are not one of the possible values, a `gl.INVALID_ENUM` error is thrown.
- The same blending limitations as for `WebGLRenderingContext.blendFuncSeparate()` apply: If a constant color and a constant alpha value are used together as source and destination factors, a `gl.INVALID_ENUM` error is thrown.

## Examples

### Setting and getting blend functions

The following sets the blend functions for the draw buffers `gl.DRAW_BUFFER0` (call where `buf` is 0) and `gl.DRAW_BUFFER1` (call where `buf` is 1).

```js
const ext = gl.getExtension("OES_draw_buffers_indexed");

ext.blendFuncSeparateiOES(0, gl.ONE, gl.ONE, gl.ZERO, gl.ZERO);
ext.blendFuncSeparateiOES(
  1,
  gl.SRC_ALPHA,
  gl.ONE_MINUS_SRC_ALPHA,
  gl.ZERO,
  gl.ZERO,
);
```

To get the blend functions for the `gl.DRAW_BUFFER0` and `gl.DRAW_BUFFER1` draw buffers, query the `BLEND_SRC_RGB`, `BLEND_SRC_ALPHA`, `BLEND_DST_RGB`, and `BLEND_DST_ALPHA` constants using `WebGL2RenderingContext.getIndexedParameter()`:

```js
// For gl.DRAW_BUFFER0
gl.getIndexedParameter(gl.BLEND_SRC_RGB, 0);
gl.getIndexedParameter(gl.BLEND_SRC_ALPHA, 0);
gl.getIndexedParameter(gl.BLEND_DST_RGB, 0);
gl.getIndexedParameter(gl.BLEND_DST_ALPHA, 0);

// For gl.DRAW_BUFFER0
gl.getIndexedParameter(gl.BLEND_SRC_RGB, 1);
gl.getIndexedParameter(gl.BLEND_SRC_ALPHA, 1);
gl.getIndexedParameter(gl.BLEND_DST_RGB, 1);
gl.getIndexedParameter(gl.BLEND_DST_ALPHA, 1);
```

## See also

- `OES_draw_buffers_indexed.blendFunciOES()`
- `WebGLRenderingContext.blendFuncSeparate()`
