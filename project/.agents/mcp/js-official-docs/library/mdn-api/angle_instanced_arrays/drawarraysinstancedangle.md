---
title: "ANGLE_instanced_arrays: drawArraysInstancedANGLE() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/angle_instanced_arrays/drawarraysinstancedangle/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ANGLE_instanced_arrays: drawArraysInstancedANGLE() method

The **`ANGLE_instanced_arrays.drawArraysInstancedANGLE()`** method of the WebGL API renders primitives from array data like the `gl.drawArrays()` method. In addition, it can execute multiple instances of the range of elements.

> **Note:**
> When using `WebGL2`, this method is available as `gl.drawArraysInstanced()` by default.

## Syntax

```js
drawArraysInstancedANGLE(mode, first, count, primcount)
```

### Parameters

- `mode`
    A `GLenum` specifying the type primitive to render. Possible values are:
    - `gl.POINTS`: Draws a single dot.
    - `gl.LINE_STRIP`: Draws a straight line to the next vertex.
    - `gl.LINE_LOOP`: Draws a straight line to the next vertex, and connects the last vertex back to the first.
    - `gl.LINES`: Draws a line between a pair of vertices.
    - `gl.TRIANGLE_STRIP`
    - `gl.TRIANGLE_FAN`
    - `gl.TRIANGLES`: Draws a triangle for a group of three vertices.

- `first`
    A `GLint` specifying the starting index in the array of vector points.
- `count`
    A `GLsizei` specifying the number of indices to be rendered.
- `primcount`
    A `GLsizei` specifying the number of instances of the range of elements to execute.

### Return value

None (`undefined`).

### Exceptions

- If `mode` is not one of the accepted values, a `gl.INVALID_ENUM` error is thrown.
- If `first`, `count` or `primcount` are negative, a `gl.INVALID_VALUE` error is thrown.
- if `gl.CURRENT_PROGRAM` is `null`, a `gl.INVALID_OPERATION` error is thrown.

## Examples

```js
const ext = gl.getExtension("ANGLE_instanced_arrays");
ext.drawArraysInstancedANGLE(gl.POINTS, 0, 8, 4);
```

## See also

- `ext.drawElementsInstancedANGLE()`
- `ext.vertexAttribDivisorANGLE()`
- `WebGLRenderingContext.drawArrays()`
- `WebGLRenderingContext.drawElements()`
- `WebGL2RenderingContext.drawArraysInstanced()`
- `WebGL2RenderingContext.drawElementsInstanced()`
- `WebGL2RenderingContext.vertexAttribDivisor()`
- `WEBGL_multi_draw.multiDrawArraysInstancedWEBGL()`
