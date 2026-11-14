---
title: "WebGL2RenderingContext: beginTransformFeedback() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webgl2renderingcontext/begintransformfeedback/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGL2RenderingContext: beginTransformFeedback() method

The **`WebGL2RenderingContext.beginTransformFeedback()`**
method of the WebGL 2 API starts a transform
feedback operation.

## Syntax

```js
beginTransformFeedback(primitiveMode)
```

### Parameters

- `primitiveMode`
    A `GLenum` specifying the output type of the primitives that will be
    recorded into the buffer objects that are bound for transform feedback. Possible
    values:
    - `gl.POINTS`
    - `gl.LINES`
    - `gl.TRIANGLES`

### Return value

None (`undefined`).

## Examples

```js
const transformFeedback = gl.createTransformFeedback();
gl.bindTransformFeedback(gl.TRANSFORM_FEEDBACK, transformFeedback);
gl.beginTransformFeedback(gl.TRIANGLES);
gl.drawArrays(gl.TRIANGLES, 0, 3);
```

## See also

- `WebGLTransformFeedback`
