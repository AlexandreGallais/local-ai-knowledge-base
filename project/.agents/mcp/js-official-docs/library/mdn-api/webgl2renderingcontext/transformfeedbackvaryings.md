---
title: "WebGL2RenderingContext: transformFeedbackVaryings() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webgl2renderingcontext/transformfeedbackvaryings/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGL2RenderingContext: transformFeedbackVaryings() method

The **`WebGL2RenderingContext.transformFeedbackVaryings()`**
method of the WebGL 2 API specifies values
to record in `WebGLTransformFeedback` buffers.

## Syntax

```js
transformFeedbackVaryings(program, varyings, bufferMode)
```

### Parameters

- `program`
    A `WebGLProgram`.
- `varyings`
    An `Array` of string specifying the names of the
    varying variables to use.
- `bufferMode`
    A `GLenum` specifying the mode to use when capturing the varying
    variables. Either `gl.INTERLEAVED_ATTRIBS` or
    `gl.SEPARATE_ATTRIBS`.

### Return value

None (`undefined`).

## Examples

```js
const transformFeedback = gl.createTransformFeedback();
gl.bindTransformFeedback(gl.TRANSFORM_FEEDBACK, transformFeedback);
const transformFeedbackOutputs = ["gl_Position", "anotherOutput"];

gl.transformFeedbackVaryings(
  shaderProg,
  transformFeedbackOutputs,
  gl.INTERLEAVED_ATTRIBS,
);
gl.linkProgram(shaderProg);
```

## See also

- `WebGLTransformFeedback`
