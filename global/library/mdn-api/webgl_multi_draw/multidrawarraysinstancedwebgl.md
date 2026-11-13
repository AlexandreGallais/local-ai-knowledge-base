---
title: "WEBGL_multi_draw: multiDrawArraysInstancedWEBGL() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webgl_multi_draw/multidrawarraysinstancedwebgl/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WEBGL_multi_draw: multiDrawArraysInstancedWEBGL() method

The **`WEBGL_multi_draw.multiDrawArraysInstancedWEBGL()`**
method of the
WebGL API renders multiple primitives from
array data. It is
identical to multiple calls to the
`gl.drawArraysInstanced()`
method.

## Syntax

```js
multiDrawArraysInstancedWEBGL(mode,
    firstsList, firstsOffset,
    countsList, countsOffset,
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

- `firstsList`
    An `Int32Array`
    or `Array`
    (of `GLint`)
    specifying a list of starting indices for the arrays of vector points.
- `firstsOffset`
    A `GLuint`
    defining the starting point into the `firstsLists` array.
- `countsList`
    An `Int32Array`
    or `Array`
    (of `GLsizei`)
    specifying a list of numbers of indices to be rendered.
- `countsOffset`
    A `GLuint`
    defining the starting point into the `countsList` array.
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
- If `drawCount` or items in `firstsList`,
  `countsList`, or `instanceCountsList` are negative,
  a `gl.INVALID_VALUE` error is thrown.
- if `gl.CURRENT_PROGRAM` is
  `null`,
  a `gl.INVALID_OPERATION` error is thrown.

## Examples

```js
const firsts = new Int32Array(/* … */);
const counts = new Int32Array(/* … */);
const instanceCounts = new Int32Array(/* … */);
ext.multiDrawArraysInstancedWEBGL(
  gl.TRIANGLES,
  firsts,
  0,
  counts,
  0,
  instanceCounts,
  0,
  firsts.length,
);
```

## See also

- `WebGLRenderingContext.drawArrays()`
- `WebGL2RenderingContext.drawArraysInstanced()`
