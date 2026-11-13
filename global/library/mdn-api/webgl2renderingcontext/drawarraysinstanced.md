---
title: "WebGL2RenderingContext: drawArraysInstanced() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webgl2renderingcontext/drawarraysinstanced/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGL2RenderingContext: drawArraysInstanced() method

The **`WebGL2RenderingContext.drawArraysInstanced()`** method
of the WebGL 2 API renders primitives from
array data like the `gl.drawArrays()`
method. In addition, it can execute multiple instances of the range of elements.

> **Note:**
> When using `WebGL 1`,
> the `ANGLE_instanced_arrays` extension can provide this method,
> too.

## Syntax

```js
drawArraysInstanced(mode, first, count, instanceCount)
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

- `first`
    A `GLint` specifying the starting index in the array of vector points.
- `count`
    A `GLsizei` specifying the number of indices to be rendered.
- `instanceCount`
    A `GLsizei` specifying the number of instances of the range of elements
    to execute.

### Return value

None (`undefined`).

## Examples

```js
gl.drawArraysInstanced(gl.POINTS, 0, 8, 4);
```

## See also

- `ANGLE_instanced_arrays.drawArraysInstancedANGLE()`
- `WEBGL_multi_draw.multiDrawArraysInstancedWEBGL()`
