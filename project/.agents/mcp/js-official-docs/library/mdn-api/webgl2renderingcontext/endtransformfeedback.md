---
title: "WebGL2RenderingContext: endTransformFeedback() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webgl2renderingcontext/endtransformfeedback/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGL2RenderingContext: endTransformFeedback() method

The **`WebGL2RenderingContext.endTransformFeedback()`** method
of the WebGL 2 API ends a transform feedback
operation.

## Syntax

```js
endTransformFeedback()
```

### Parameters

None.

### Return value

None (`undefined`).

## Examples

```js
const transformFeedback = gl.createTransformFeedback();
gl.bindTransformFeedback(gl.TRANSFORM_FEEDBACK, transformFeedback);
gl.beginTransformFeedback(gl.TRIANGLES);
gl.drawArrays(gl.TRIANGLES, 0, 3);
gl.endTransformFeedback();
```

## See also

- `WebGLTransformFeedback`
