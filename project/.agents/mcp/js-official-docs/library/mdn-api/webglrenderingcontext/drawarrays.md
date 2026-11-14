---
title: "WebGLRenderingContext: drawArrays() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webglrenderingcontext/drawarrays/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGLRenderingContext: drawArrays() method

The **`WebGLRenderingContext.drawArrays()`** method of the WebGL API renders primitives from array data.

## Syntax

```js
drawArrays(mode, first, count)
```

### Parameters

- `mode`
    A `GLenum` specifying the type primitive to render. Possible values
    are:
    - `gl.POINTS`: Draws a single dot.
    - `gl.LINE_STRIP`: Draws a straight line to the next vertex.
    - `gl.LINE_LOOP`: Draws a straight line to the next vertex, and
      connects the last vertex back to the first.
    - `gl.LINES`: Draws a line between a pair of vertices.
    - `gl.TRIANGLE_STRIP`
    - `gl.TRIANGLE_FAN`
    - `gl.TRIANGLES`: Draws a triangle for a group of three vertices.

    > **Note:**
    > If `mode` is `POINTS`, `gl_PointSize` may need to be set for `drawArrays` to render, as its value is unknown if not explicitly written. Only some GPUs set its default as `1.0`.

- `first`
    A `GLint` specifying the starting index in the array of vector points.
- `count`
    A `GLsizei` specifying the number of indices to be rendered.

### Return value

None (`undefined`).

### Exceptions

- If `mode` is not one of the accepted values, a
  `gl.INVALID_ENUM` error is thrown.
- If `first` or `count` are negative, a
  `gl.INVALID_VALUE` error is thrown.
- if `gl.CURRENT_PROGRAM` is `null`, a
  `gl.INVALID_OPERATION` error is thrown.

## Examples

```js
gl.drawArrays(gl.POINTS, 0, 8);
```

## See also

- `WebGLRenderingContext.drawElements()`
- `ext.drawArraysInstancedANGLE()`
- `ext.drawElementsInstancedANGLE()`
- `ext.vertexAttribDivisorANGLE()`
- `WebGL2RenderingContext.drawArraysInstanced()`
- `WebGL2RenderingContext.drawElementsInstanced()`
- `WebGL2RenderingContext.vertexAttribDivisor()`
- `WEBGL_multi_draw.multiDrawArraysWEBGL()`
