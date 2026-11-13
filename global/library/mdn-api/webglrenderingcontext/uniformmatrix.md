---
title: "WebGLRenderingContext: uniformMatrix[234]fv() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webglrenderingcontext/uniformmatrix/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGLRenderingContext: uniformMatrix[234]fv() method

The **`WebGLRenderingContext.uniformMatrix[234]fv()`** methods
of the WebGL API specify matrix values for
uniform variables.

The three versions of this method (`uniformMatrix2fv()`,
`uniformMatrix3fv()`, and `uniformMatrix4fv()`) take as the input
value 2-component, 3-component, and 4-component square matrices, respectively. They are
expected to have 4, 9 or 16 floats.

## Syntax

```js
uniformMatrix2fv(location, transpose, value)
uniformMatrix3fv(location, transpose, value)
uniformMatrix4fv(location, transpose, value)
```

### Parameters

- `location`
    A `WebGLUniformLocation` object containing the location of the uniform
    attribute to modify. The location is obtained using
    `getUniformLocation()`.
- `transpose`
    A `GLboolean` specifying whether to transpose the matrix. Must be
    `false`.
- `value`
    A `Float32Array` or sequence of `GLfloat` values. The values
    are assumed to be supplied in column major order.

### Return value

None (`undefined`).

## Examples

```js
gl.uniformMatrix2fv(loc, false, [2, 1, 2, 2]);
```

## See also

- `WebGLRenderingContext.uniform()`
- `WebGL2RenderingContext.uniformMatrix()` – WebGL 2 versions of these
  methods.
