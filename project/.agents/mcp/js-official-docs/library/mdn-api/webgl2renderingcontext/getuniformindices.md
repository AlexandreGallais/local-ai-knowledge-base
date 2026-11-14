---
title: "WebGL2RenderingContext: getUniformIndices() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webgl2renderingcontext/getuniformindices/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGL2RenderingContext: getUniformIndices() method

The **`WebGL2RenderingContext.getUniformIndices()`** method of
the WebGL 2 API retrieves the indices of a
number of uniforms within a `WebGLProgram`.

## Syntax

```js
getUniformIndices(program, uniformNames)
```

### Parameters

- `program`
    A `WebGLProgram` containing uniforms whose indices to query.
- `uniformNames`
    An `Array` of string specifying the names of the
    uniforms to query.

### Return value

An `Array` of `GLuint` containing the uniform indices.

## Examples

```js
const uniformIndices = gl.getUniformIndices(program, [
  "UBORed",
  "UBOGreen",
  "UBOBlue",
]);
```

## See also

- `WebGL2RenderingContext.getUniformBlockIndex()`
