---
title: "WebGL2RenderingContext: clearBuffer[fiuv]() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webgl2renderingcontext/clearbuffer/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGL2RenderingContext: clearBuffer[fiuv]() method

The **`WebGL2RenderingContext.clearBufferfiuv`** methods of
the WebGL 2 API clear buffers from the
currently bound framebuffer.

## Syntax

```js
clearBufferfv(buffer, drawbuffer, values)
clearBufferfv(buffer, drawbuffer, values, srcOffset)

clearBufferiv(buffer, drawbuffer, values)
clearBufferiv(buffer, drawbuffer, values, srcOffset)

clearBufferuiv(buffer, drawbuffer, values)
clearBufferuiv(buffer, drawbuffer, values, srcOffset)

clearBufferfi(buffer, drawbuffer, depth, stencil)
```

### Parameters

- `buffer`
    A `GLenum` specifying the buffer to clear. Possible values are:
    - `gl.COLOR`: Color buffer.
    - `gl.DEPTH`: Depth buffer.
    - `gl.STENCIL`: Stencil buffer.
    - `gl.DEPTH_STENCIL`: clears depth and stencil buffers (used with
      `clearBufferfi`).

- `drawBuffer`
    A `GLint` specifying the draw buffer to clear.
- `values`
    An `Array` of `GLint`, `GLuint`
    or `GLfloat` values or
    an `Int32Array`, `Uint32Array` or `Float32Array`
    specifying the values to clear to.
- `depth`
    A `GLfloat` specifying the value to clear a depth render buffer to.
- `stencil`
    A `GLint` specifying the value to clear the stencil render buffer to.

### Return value

None (`undefined`).

## Examples

```js
gl.clearBufferiv(gl.COLOR, 0, new Int32Array([r, g, b, a]));
gl.clearBufferuiv(gl.COLOR, 0, new Uint32Array([r, g, b, a]));
gl.clearBufferfv(gl.COLOR, 0, new Float32Array([r, g, b, a]));
gl.clearBufferfv(gl.COLOR, 0, [0.0, 0.0, 0.0, 0.0]);
gl.clearBufferfi(gl.DEPTH_STENCIL, 0, 1.0, 0);
```

## See also

- `WebGL2RenderingContext.drawBuffers()`
