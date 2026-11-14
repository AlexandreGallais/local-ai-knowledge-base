---
title: "WebGL2RenderingContext: uniformBlockBinding() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webgl2renderingcontext/uniformblockbinding/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGL2RenderingContext: uniformBlockBinding() method

The **`WebGL2RenderingContext.uniformBlockBinding()`** method
of the WebGL 2 API assigns binding points
for active uniform blocks.

## Syntax

```js
uniformBlockBinding(program, uniformBlockIndex, uniformBlockBinding)
```

### Parameters

- `program`
    A `WebGLProgram` containing the active uniform block whose binding to
    assign.
- `uniformBlockIndex`
    A `GLuint` specifying the index of the active uniform block within the
    program.
- `uniformBlockBinding`
    A `GLuint` specifying the binding point to which to bind the uniform
    block.

### Return value

None (`undefined`).

## Examples

```js
gl.uniformBlockBinding(program, 0, 1);
```

## See also

- `WebGL2RenderingContext.getUniformIndices()`
