---
title: "OES_draw_buffers_indexed: colorMaskiOES() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/oes_draw_buffers_indexed/colormaskioes/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# OES_draw_buffers_indexed: colorMaskiOES() method

The `colorMaskiOES()` method of the `OES_draw_buffers_indexed` WebGL extension sets which color components to enable or to disable when drawing or rendering for a particular draw buffer. It's the indexed version of WebGL 1's `WebGLRenderingContext.colorMask()` method.

## Syntax

```js
colorMaskiOES(buf, r, g, b, a)
```

### Parameters

- `buf`
    An integer `i` specifying the draw buffer associated with the constant `gl.DRAW_BUFFERi`, see WebGL draw buffer constants.
- `r`
    A `GLboolean` specifying whether or not the red color component should be written into the draw buffer.
- `g`
    A `GLboolean` specifying whether or not the green color component should be written into the draw buffer.
- `b`
    A `GLboolean` specifying whether or not the blue color component should be written into the draw buffer.
- `a`
    A `GLboolean` specifying whether or not the red alpha (transparency) component should be written into the draw buffer.

### Return value

None (`undefined`).

### Exceptions

- If `buf`, `r`, `b`, `g`, or `a` are not a valid values, a `gl.INVALID_VALUE` error is thrown.

## Examples

### Setting and getting color masks

You can set the color masks for the `gl.DRAW_BUFFER0` and `gl.DRAW_BUFFER1` draw buffers like this:

```js
const ext = gl.getExtension("OES_draw_buffers_indexed");

ext.colorMaskiOES(0, 1, 0, 0, 0);
ext.colorMaskiOES(1, 0, 1, 0, 0);
```

To get the color masks for the `gl.DRAW_BUFFER0` and `gl.DRAW_BUFFER1` draw buffers, query the `COLOR_WRITEMASK` constant using `WebGL2RenderingContext.getIndexedParameter()`:

```js
gl.getIndexedParameter(gl.COLOR_WRITEMASK, 0);
gl.getIndexedParameter(gl.COLOR_WRITEMASK, 1);
```

## See also

- `WebGL2RenderingContext.getIndexedParameter()`
- `WebGLRenderingContext.colorMask()`
