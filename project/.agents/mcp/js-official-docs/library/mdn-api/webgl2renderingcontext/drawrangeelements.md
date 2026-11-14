---
title: "WebGL2RenderingContext: drawRangeElements() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webgl2renderingcontext/drawrangeelements/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGL2RenderingContext: drawRangeElements() method

The **`WebGL2RenderingContext.drawRangeElements()`** method of
the WebGL API renders primitives from array
data in a given range.

## Syntax

```js
drawRangeElements(mode, start, end, count, type, offset)
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

- `start`
    A `GLuint` specifying the minimum array index contained in
    `offset`.
- `end`
    A `GLuint` specifying the maximum array index contained in
    `offset`.
- `count`
    A `GLsizei` specifying the number of elements to be rendered.
- `type`
    A `GLenum` specifying the type of the values in the element array
    buffer. Possible values are:
    - `gl.UNSIGNED_BYTE`
    - `gl.UNSIGNED_SHORT`
    - `gl.UNSIGNED_INT`

- `offset`
    A `GLintptr` specifying an offset in the element array buffer. Must be
    a valid multiple of the size of the given `type`.

### Return value

None (`undefined`).

### Exceptions

- If `mode` is not one of the accepted values, a
  `gl.INVALID_ENUM` error is thrown.
- If `offset` is a valid multiple of the size of the given type, a
  `gl.INVALID_OPERATION` error is thrown.
- If `count` is negative, a `gl.INVALID_VALUE` error is thrown.

## Examples

```js
gl.drawRangeElements(gl.POINTS, 0, 7, 8, gl.UNSIGNED_BYTE, 0);
```

## See also

- `WebGLRenderingContext.drawElements()`
