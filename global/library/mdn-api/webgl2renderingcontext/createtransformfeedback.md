---
title: "WebGL2RenderingContext: createTransformFeedback() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webgl2renderingcontext/createtransformfeedback/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGL2RenderingContext: createTransformFeedback() method

The **`WebGL2RenderingContext.createTransformFeedback()`**
method of the WebGL 2 API creates and
initializes `WebGLTransformFeedback` objects.

## Syntax

```js
createTransformFeedback()
```

### Parameters

None.

### Return value

A `WebGLTransformFeedback` object.

## Examples

`gl` must be a `WebGL2RenderingContext`.
`WebGLTransformFeedback` objects are not available in WebGL 1.

```js
const transformFeedback = gl.createTransformFeedback();
```

## See also

- `WebGLTransformFeedback`
