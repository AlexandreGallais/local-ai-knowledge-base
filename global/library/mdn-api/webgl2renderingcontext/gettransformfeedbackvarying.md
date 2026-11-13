---
title: "WebGL2RenderingContext: getTransformFeedbackVarying() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webgl2renderingcontext/gettransformfeedbackvarying/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGL2RenderingContext: getTransformFeedbackVarying() method

The **`WebGL2RenderingContext.getTransformFeedbackVarying()`**
method of the WebGL 2 API returns
information about varying variables from `WebGLTransformFeedback` buffers.

## Syntax

```js
getTransformFeedbackVarying(program, index)
```

### Parameters

- `program`
    A `WebGLProgram`.
- `index`
    A `GLuint` specifying the index of the varying variable whose
    information to retrieve.

### Return value

A `WebGLActiveInfo` object.

## Examples

```js
activeInfo = gl.getTransformFeedbackVarying(program, 0);
```

## See also

- `WebGLTransformFeedback`
