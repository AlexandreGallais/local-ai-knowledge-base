---
title: "ANGLE_instanced_arrays: drawElementsInstancedANGLE() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/angle_instanced_arrays/drawelementsinstancedangle/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ANGLE_instanced_arrays: drawElementsInstancedANGLE() method

The **`ANGLE_instanced_arrays.drawElementsInstancedANGLE()`** method of the WebGL API renders primitives from array data like the `gl.drawElements()` method. In addition, it can execute multiple instances of a set of elements.

> **Note:**
> When using `WebGL2`, this method is available as `gl.drawElementsInstanced()` by default.

## Syntax

```js
drawElementsInstancedANGLE(mode, count, type, offset, primcount)
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

- `count`
    A `GLsizei` specifying the number of elements to be rendered.
- `type`
    A `GLenum` specifying the type of the values in the element array buffer. Possible values are:
    - `gl.UNSIGNED_BYTE`
    - `gl.UNSIGNED_SHORT`
    - `gl.UNSIGNED_INT` when using the `OES_element_index_uint` extension.

- `offset`
    A `GLintptr` specifying an offset in the element array buffer. Must be a valid multiple of the size of the given `type`.
- `primcount`
    A `GLsizei` specifying the number of instances of the set of elements to execute.

### Return value

None (`undefined`).

### Exceptions

- If `mode` is not one of the accepted values, a `gl.INVALID_ENUM` error is thrown.
- If `offset` is an invalid multiple of the size of the given type, a `gl.INVALID_OPERATION` error is thrown.
- If `count` or `primcount` are negative, a `gl.INVALID_VALUE` error is thrown.

## Examples

```js
const ext = gl.getExtension("ANGLE_instanced_arrays");
ext.drawElementsInstancedANGLE(gl.POINTS, 2, gl.UNSIGNED_SHORT, 0, 4);
```

## See also

- `ext.drawArraysInstancedANGLE()`
- `ext.vertexAttribDivisorANGLE()`
- `WebGLRenderingContext.drawArrays()`
- `WebGLRenderingContext.drawElements()`
- `WebGL2RenderingContext.drawArraysInstanced()`
- `WebGL2RenderingContext.drawElementsInstanced()`
- `WebGL2RenderingContext.vertexAttribDivisor()`
- `WEBGL_multi_draw.multiDrawElementsInstancedWEBGL()`
