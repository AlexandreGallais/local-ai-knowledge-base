---
title: "WebGL2RenderingContext: uniformMatrix[234]x[234]fv() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webgl2renderingcontext/uniformmatrix/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGL2RenderingContext: uniformMatrix[234]x[234]fv() method

The **`WebGL2RenderingContext.uniformMatrix[234]x[234]fv()`**
methods of the WebGL 2 API specify matrix
values for uniform variables.

> **Note:**
> There are no `2x2`, `3x3`, and `4x4` versions of
> this method. They are abbreviated in `2`, `3`, and
> `4`, respectively. See the syntax below.

## Syntax

```js
uniformMatrix2fv(location, transpose, data)
uniformMatrix2fv(location, transpose, data, srcOffset)
uniformMatrix2fv(location, transpose, data, srcOffset, srcLength)

uniformMatrix3x2fv(location, transpose, data)
uniformMatrix3x2fv(location, transpose, data, srcOffset)
uniformMatrix3x2fv(location, transpose, data, srcOffset, srcLength)

uniformMatrix4x2fv(location, transpose, data)
uniformMatrix4x2fv(location, transpose, data, srcOffset)
uniformMatrix4x2fv(location, transpose, data, srcOffset, srcLength)

uniformMatrix2x3fv(location, transpose, data)
uniformMatrix2x3fv(location, transpose, data, srcOffset)
uniformMatrix2x3fv(location, transpose, data, srcOffset, srcLength)

uniformMatrix3fv(location, transpose, data)
uniformMatrix3fv(location, transpose, data, srcOffset)
uniformMatrix3fv(location, transpose, data, srcOffset, srcLength)

uniformMatrix4x3fv(location, transpose, data)
uniformMatrix4x3fv(location, transpose, data, srcOffset)
uniformMatrix4x3fv(location, transpose, data, srcOffset, srcLength)

uniformMatrix2x4fv(location, transpose, data)
uniformMatrix2x4fv(location, transpose, data, srcOffset)
uniformMatrix2x4fv(location, transpose, data, srcOffset, srcLength)

uniformMatrix3x4fv(location, transpose, data)
uniformMatrix3x4fv(location, transpose, data, srcOffset)
uniformMatrix3x4fv(location, transpose, data, srcOffset, srcLength)

uniformMatrix4fv(location, transpose, data)
uniformMatrix4fv(location, transpose, data, srcOffset)
uniformMatrix4fv(location, transpose, data, srcOffset, srcLength)
```

### Parameters

- `location`
    A `WebGLUniformLocation` object containing the location of the uniform
    attribute to modify.
- `transpose`
    A `GLboolean` specifying whether to transpose the matrix.
- `data`
    A `Float32Array` of float values.

### Return value

None (`undefined`).

## Examples

```js
gl.uniformMatrix2x3fv(loc, false, [1, 2, 3, 4, 5, 6]);
```

## See also

- `WebGLRenderingContext.uniformMatrix()`
