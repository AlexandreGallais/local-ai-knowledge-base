---
title: "WebGL2RenderingContext: isTransformFeedback() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webgl2renderingcontext/istransformfeedback/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGL2RenderingContext: isTransformFeedback() method

The **`WebGL2RenderingContext.isTransformFeedback()`** method
of the WebGL 2 API returns `true`
if the passed object is a valid `WebGLTransformFeedback` object.

## Syntax

```js
isTransformFeedback(transformFeedback)
```

### Parameters

- `transformFeedback`
    A `WebGLTransformFeedback` object to test.

### Return value

A `GLboolean` indicating whether the given object is a valid
`WebGLTransformFeedback` object (`true`) or not
(`false`).

## Examples

`gl` must be a `WebGL2RenderingContext`.
`WebGLTransformFeedback` objects are not available in WebGL 1.

```js
const transformFeedback = gl.createTransformFeedback();

// …

gl.isTransformFeedback(transformFeedback);
```

## See also

- `WebGLTransformFeedback`
