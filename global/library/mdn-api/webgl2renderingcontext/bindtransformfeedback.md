---
title: "WebGL2RenderingContext: bindTransformFeedback() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webgl2renderingcontext/bindtransformfeedback/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGL2RenderingContext: bindTransformFeedback() method

The **`WebGL2RenderingContext.bindTransformFeedback()`** method
of the WebGL 2 API binds a
passed `WebGLTransformFeedback` object to the current GL state.

## Syntax

```js
bindTransformFeedback(target, transformFeedback)
```

### Parameters

- `target`
    A `GLenum` specifying the target (binding point). Must be
    `gl.TRANSFORM_FEEDBACK`.
- `transformFeedback`
    A `WebGLTransformFeedback` object to bind.

### Return value

None (`undefined`).

## Examples

```js
const transformFeedback = gl.createTransformFeedback();
gl.bindTransformFeedback(gl.TRANSFORM_FEEDBACK, transformFeedback);
```

## See also

- `WebGLTransformFeedback`
