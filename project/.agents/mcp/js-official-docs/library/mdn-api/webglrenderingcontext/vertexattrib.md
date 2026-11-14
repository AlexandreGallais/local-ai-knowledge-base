---
title: "WebGLRenderingContext: vertexAttrib[1234]f[v]() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webglrenderingcontext/vertexattrib/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGLRenderingContext: vertexAttrib[1234]f[v]() method

The **`WebGLRenderingContext.vertexAttrib[1234]fv`**
methods of the WebGL API specify constant
values for generic vertex attributes.

## Syntax

```js
vertexAttrib1f(index, v0)
vertexAttrib2f(index, v0, v1)
vertexAttrib3f(index, v0, v1, v2)
vertexAttrib4f(index, v0, v1, v2, v3)

vertexAttrib1fv(index, value)
vertexAttrib2fv(index, value)
vertexAttrib3fv(index, value)
vertexAttrib4fv(index, value)
```

### Parameters

- `index`
    A `GLuint` specifying the position of the vertex attribute to be
    modified.
- `v0`, `v1`, `v2`, `v3`
    A floating point `Number` for the vertex attribute value.
- `value`
    A `Float32Array` for floating point vector vertex attribute values.

### Return value

None (`undefined`).

## Description

While vertex attributes are usually used to specify values which are different for each
vertex (using `vertexAttribPointer`), it can be useful to specify a constant value.
For example, if you have a shader which has a `color` vertex attribute, but you want to draw everything in a single color, you can use `vertexAttrib` to achieve that without creating a buffer filled with only one value or having to create a separate shader which uses a uniform for the color.

This value will be used if a bound array buffer has not been enabled with
`enableVertexAttribArray`.

Attributes may be matrices, in which case columns of the matrix must be loaded into
successive vertex attribute slots.

The values set with `vertexAttrib` are context-global; that is, they aren't part of the shader state
(like generic vertex attribute indexes to shader variable bindings) and aren't part of
the vertex array object state (like enabled vertex attribute arrays). The only way to
change the values is by calling this function again.

## Examples

```js
const index = gl.getAttribLocation(shaderProgram, "foobar");
// Either set each component individually:
gl.vertexAttrib3f(index, 10.0, 5.0, 2.0);
// Or provide a Float32Array:
const floatArray = new Float32Array([10.0, 5.0, 2.0]);
gl.vertexAttrib3fv(index, floatArray);
```

```js
// We want to load the following 3x3 matrix into attribute named "matrix3x3"
// 0 1 2
// 3 4 5
// 6 7 8
const matrix3x3Location = gl.getAttribLocation(shaderProgram, "matrix3x3");
gl.vertexAttrib3f(matrix3x3Location, 0, 3, 6);
gl.vertexAttrib3f(matrix3x3Location + 1, 1, 4, 7);
gl.vertexAttrib3f(matrix3x3Location + 2, 2, 5, 8);
```

## See also

- `WebGLRenderingContext.getVertexAttrib()`
