---
title: "WebGL2RenderingContext: deleteTransformFeedback() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webgl2renderingcontext/deletetransformfeedback/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGL2RenderingContext: deleteTransformFeedback() method

The **`WebGL2RenderingContext.deleteTransformFeedback()`**
method of the WebGL 2 API deletes a given
`WebGLTransformFeedback` object.

## Syntax

```js
deleteTransformFeedback(transformFeedback)
```

### Parameters

- `transformFeedback`
    A `WebGLTransformFeedback` object to delete.

### Return value

None (`undefined`).

## Examples

`gl` must be a `WebGL2RenderingContext`.
`WebGLTransformFeedback` objects are not available in WebGL 1.

```js
const transformFeedback = gl.createTransformFeedback();

// …

gl.deleteTransformFeedback(transformFeedback);
```

## See also

- `WebGLTransformFeedback`
