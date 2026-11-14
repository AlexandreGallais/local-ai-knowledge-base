---
title: "WebGL2RenderingContext: getActiveUniformBlockName() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webgl2renderingcontext/getactiveuniformblockname/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGL2RenderingContext: getActiveUniformBlockName() method

The **`WebGL2RenderingContext.getActiveUniformBlockName()`**
method of the WebGL 2 API retrieves the name
of the active uniform block at a given index within a `WebGLProgram`.

## Syntax

```js
getActiveUniformBlockName(program, uniformBlockIndex)
```

### Parameters

- `program`
    A `WebGLProgram` containing the uniform block.
- `uniformBlockIndex`
    A `GLuint` specifying the index of the uniform block to whose name to
    retrieve.

### Return value

A string indicating the active uniform block name.

## Examples

```js
const blockName = gl.getActiveUniformBlockName(program, 0);
```

## See also

- `WebGL2RenderingContext.getUniformBlockIndex()`
