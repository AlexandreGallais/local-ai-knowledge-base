---
title: "WebGL2RenderingContext: getActiveUniforms() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webgl2renderingcontext/getactiveuniforms/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGL2RenderingContext: getActiveUniforms() method

The **`WebGL2RenderingContext.getActiveUniforms()`** method of
the WebGL 2 API retrieves information about
active uniforms within a `WebGLProgram`.

## Syntax

```js
getActiveUniforms(program, uniformIndices, pname)
```

### Parameters

- `program`
    A `WebGLProgram` containing the active uniforms.
- `uniformIndices`
    An `Array` of `GLuint` specifying the indices of the active
    uniforms to query.
- `pname`
    A `GLenum` specifying which information to query. Possible values:
    - `gl.UNIFORM_TYPE`
        Returns an `Array` of
        `GLenum` indicating the types of the uniforms.
    - `gl.UNIFORM_SIZE`
        Returns an `Array` of
        `GLuint` indicating the sizes of the uniforms.
    - `gl.UNIFORM_BLOCK_INDEX`
        Returns an `Array` of
        `GLint` indicating the block indices of the uniforms.
    - `gl.UNIFORM_OFFSET`
        Returns an `Array` of
        `GLint` indicating the uniform buffer offsets.
    - `gl.UNIFORM_ARRAY_STRIDE`
        Returns an `Array` of
        `GLint` indicating the strides between the elements.
    - `gl.UNIFORM_MATRIX_STRIDE`
        Returns an `Array` of
        `GLint` indicating the strides between columns of a column-major
        matrix or a row-major matrix.
    - `gl.UNIFORM_IS_ROW_MAJOR`
        Returns an `Array` of
        `GLboolean` indicating whether each of the uniforms is a row-major
        matrix or not.

### Return value

Depends on which information is requested using the `pname` parameter.

## Examples

```js
const uniformIndices = gl.getUniformIndices(program, [
  "UBORed",
  "UBOGreen",
  "UBOBlue",
]);
const uniformOffsets = gl.getActiveUniforms(
  program,
  uniformIndices,
  gl.UNIFORM_OFFSET,
);
```

## See also

- `WebGL2RenderingContext.getActiveUniformBlockParameter()`
