---
title: "WEBGL_multi_draw: multiDrawElementsInstancedWEBGL() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webgl_multi_draw/multidrawelementsinstancedwebgl/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WEBGL_multi_draw: multiDrawElementsInstancedWEBGL() method

The **`WEBGL_multi_draw.multiDrawElementsInstancedWEBGL()`** method of
the
WebGL API renders multiple primitives from
array data. It is
identical to multiple calls to the
`gl.drawElementsInstanced()`
method.

## Syntax

```js
multiDrawElementsInstancedWEBGL(mode,
    countsList, countsOffset,
    type,
    firstsList, firstsOffset,
    instanceCountsList, instanceCountsOffset,
    drawCount)
```

### Parameters

- `mode`
    A `GLenum`
    specifying the type primitive to render. Possible values are:
    - `gl.POINTS`: Draws a single dot.
    - `gl.LINE_STRIP`: Draws a straight line to the next vertex.
    - `gl.LINE_LOOP`: Draws a straight line to the next vertex, and
      connects the
      last vertex back to the first.
    - `gl.LINES`: Draws a line between a pair of vertices.
    - `gl.TRIANGLE_STRIP`
    - `gl.TRIANGLE_FAN`
    - `gl.TRIANGLES`: Draws a triangle for a group of three vertices.

- `countsList`
    An `Int32Array`
    or `Array`
    (of `GLint`)
    specifying a list of numbers of indices to be rendered.
- `countsOffset`
    A `GLUint`
    defining the starting point into the `countsList` array.
- type
    A `GLenum` specifying
    the type of the values in the element array buffer. Possible values are:
    - `gl.UNSIGNED_BYTE`
    - `gl.UNSIGNED_SHORT`
    - When using the `OES_element_index_uint`
      extension:
      - `gl.UNSIGNED_INT`

- `offsetsList`
    An `Int32Array`
    or `Array`
    (of `GLsizei`)
    specifying a list of starting indices for the arrays of vector points.
- `offsetsOffset`
    A `GLuint`
    defining the starting point into the `offsetsList` array.
- `instanceCountsList`
    An `Int32Array`
    or `Array`
    (of `GLsizei`)
    specifying a list of numbers of instances of the range of elements to execute.
- `instanceCountsOffset`
    A `GLuint`
    defining the starting point into the `instanceCountsList` array.
- `drawCount`
    A `GLsizei`
    specifying the number of instances of the range of elements to execute.

### Return value

None.

### Exceptions

- If `mode` is not one of the accepted values, a
  `gl.INVALID_ENUM` error is thrown.
- If `drawCount` or items in `countsList`,
  `offsetsList`, or `instanceCountsList` are negative,
  a `gl.INVALID_VALUE` error is thrown.

## Examples

```js
const counts = new Int32Array(/* … */);
const offsets = new Int32Array(/* … */);
const instanceCounts = new Int32Array(/* … */);
ext.multiDrawElementsInstancedWEBGL(
  gl.TRIANGLES,
  counts,
  0,
  gl.UNSIGNED_SHORT,
  offsets,
  0,
  instanceCounts,
  0,
  counts.length,
);
```

## See also

- `WebGLRenderingContext.drawElements()`
- `WebGL2RenderingContext.drawElementsInstanced()`
