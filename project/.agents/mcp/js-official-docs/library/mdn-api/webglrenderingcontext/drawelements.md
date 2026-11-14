---
title: "WebGLRenderingContext: drawElements() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webglrenderingcontext/drawelements/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGLRenderingContext: drawElements() method

The **`WebGLRenderingContext.drawElements()`** method of the WebGL API renders primitives from array data.

## Syntax

```js
drawElements(mode, count, type, offset)
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

- `count`
    A `GLsizei` specifying the number of elements of the bound element array
    buffer to be rendered. For example, to draw a wireframe triangle with `gl.LINES`
    the count should be 2 endpoints per line × 3 lines = 6 elements. However to draw the
    same wireframe triangle with `gl.LINE_STRIP` the element array buffer does not
    repeat the indices for the end of the first line/start of the second line, and end of the
    second line/start of the third line, so `count` will be four. To draw the same
    triangle with `gl.LINE_LOOP` the element array buffer does not repeat the
    first/last vertex either so `count` will be three.
- `type`
    A `GLenum` specifying the type of the values in the element array
    buffer. Possible values are:
    - `gl.UNSIGNED_BYTE`
    - `gl.UNSIGNED_SHORT`

    When using the `OES_element_index_uint` extension:
    - `gl.UNSIGNED_INT`

- `offset`
    A `GLintptr` specifying a byte offset in the element array buffer. Must
    be a valid multiple of the size of the given `type`.

### Return value

None (`undefined`).

### Exceptions

- If `mode` is not one of the accepted values, a
  `gl.INVALID_ENUM` error is thrown.
- If `offset` is not a valid multiple of the size of the given type, a
  `gl.INVALID_OPERATION` error is thrown.
- If `count` is negative, a `gl.INVALID_VALUE` error is thrown.

## Examples

```js
gl.drawElements(gl.POINTS, 8, gl.UNSIGNED_BYTE, 0);
```

## See also

- `WebGLRenderingContext.drawArrays()`
- `OES_element_index_uint`
- `WEBGL_multi_draw.multiDrawElementsWEBGL()`
