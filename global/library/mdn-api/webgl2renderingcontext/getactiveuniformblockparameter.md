---
title: "WebGL2RenderingContext: getActiveUniformBlockParameter() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webgl2renderingcontext/getactiveuniformblockparameter/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGL2RenderingContext: getActiveUniformBlockParameter() method

The
**`WebGL2RenderingContext.getActiveUniformBlockParameter()`**
method of the WebGL 2 API retrieves
information about an active uniform block within a `WebGLProgram`.

## Syntax

```js
getActiveUniformBlockParameter(program, uniformBlockIndex, pname)
```

### Parameters

- `program`
    A `WebGLProgram` containing the active uniform block.
- `uniformBlockIndex`
    A `GLuint` specifying the index of the active uniform block within the
    program.
- `pname`
    A `GLenum` specifying which information to query. Possible values:
    - `gl.UNIFORM_BLOCK_BINDING`
        Returns a `GLuint`
        indicating the uniform buffer binding point.
    - `gl.UNIFORM_BLOCK_DATA_SIZE`
        Returns a `GLuint`
        indicating the minimum total buffer object size.
    - `gl.UNIFORM_BLOCK_ACTIVE_UNIFORMS`
        Returns a `GLuint`
        indicating the number of active uniforms in the uniform block.
    - `gl.UNIFORM_BLOCK_ACTIVE_UNIFORM_INDICES`
        Returns a
        `Uint32Array` indicating the list of active uniforms in the uniform
        block.
    - `gl.UNIFORM_BLOCK_REFERENCED_BY_VERTEX_SHADER`
        Returns a
        `GLboolean` indicating whether the uniform block is referenced by the
        vertex shader.
    - `gl.UNIFORM_BLOCK_REFERENCED_BY_FRAGMENT_SHADER`
        Returns a
        `GLboolean` indicating whether the uniform block is referenced by the
        fragment shader.

### Return value

Depends on which information is requested using the `pname` parameter. If an
error occurs, `null` is returned.

## Examples

```js
const blockSize = gl.getActiveUniformBlockParameter(
  program,
  blockIndex,
  gl.UNIFORM_BLOCK_DATA_SIZE,
);
```

## See also

- `WebGL2RenderingContext.getActiveUniforms()`
