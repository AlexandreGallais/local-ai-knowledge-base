---
title: "OES_draw_buffers_indexed: blendFunciOES() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/oes_draw_buffers_indexed/blendfuncioes/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# OES_draw_buffers_indexed: blendFunciOES() method

The `blendFunciOES()` method of the `OES_draw_buffers_indexed` WebGL extension defines which function is used when blending pixels for a particular draw buffer.

See `OES_draw_buffers_indexed.blendFuncSeparateiOES()` for setting RGB and alpha components separately and `WebGLRenderingContext.blendFunc()` for the WebGL 1 version of this method.

## Syntax

```js
blendFunciOES(buf, src, dst)
```

### Parameters

- `buf`
    An integer `i` specifying the draw buffer associated with the constant `gl.DRAW_BUFFERi`, see WebGL draw buffer constants.
- `src`
    A `GLenum` specifying a multiplier for the source blending factors. Accepts the same enums as the `sfactor` parameter in `WebGLRenderingContext.blendFunc()`.
- `dst`
    A `GLenum` specifying a multiplier for the destination blending factors. Accepts the same enums as the `dfactor` parameter in `WebGLRenderingContext.blendFunc()`.

### Return value

None (`undefined`).

### Exceptions

- If `buf` is not a valid value, a `gl.INVALID_VALUE` error is thrown.
- If `src` or `dst` are not one of the possible values, a `gl.INVALID_ENUM` error is thrown.
- The same blending limitations as for `WebGLRenderingContext.blendFunc()` apply: If a constant color and a constant alpha value are used together as source and destination factors, a `gl.INVALID_ENUM` error is thrown.

## Examples

### Setting and getting blend functions

You can set the blend functions for the `gl.DRAW_BUFFER0` and `gl.DRAW_BUFFER1` draw buffers like this:

```js
const ext = gl.getExtension("OES_draw_buffers_indexed");

ext.blendFunciOES(0, gl.ONE, gl.ONE);
ext.blendFunciOES(1, gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
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

- `OES_draw_buffers_indexed.blendFuncSeparateiOES()`
- `WebGLRenderingContext.blendFunc()`
