---
title: "WebGL2RenderingContext: getUniformBlockIndex() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webgl2renderingcontext/getuniformblockindex/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGL2RenderingContext: getUniformBlockIndex() method

The **`WebGL2RenderingContext.getUniformBlockIndex()`** method
of the WebGL 2 API retrieves the index of
a uniform block within a `WebGLProgram`.

## Syntax

```js
getUniformBlockIndex(program, uniformBlockName)
```

### Parameters

- `program`
    A `WebGLProgram` containing the uniform block.
- `uniformName`
    A string specifying the name of the uniform block to whose index
    to retrieve.

### Return value

A `GLuint` indicating the uniform block index.

## Examples

```js
// Assuming a shader with the following declaration:
// uniform UBOData {
//   mat4 foo;
// } instanceName;

// use the block name, not the instance name:
const blockIndex = gl.getUniformBlockIndex(program, "UBOData");
```

## See also

- `WebGL2RenderingContext.getUniformIndices()`
