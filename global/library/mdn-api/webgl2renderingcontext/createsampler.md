---
title: "WebGL2RenderingContext: createSampler() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webgl2renderingcontext/createsampler/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGL2RenderingContext: createSampler() method

The **`WebGL2RenderingContext.createSampler()`** method of the
WebGL 2 API creates and initializes
`WebGLSampler` objects.

## Syntax

```js
createSampler()
```

### Parameters

None.

### Return value

A `WebGLSampler` object.

## Examples

`gl` must be a `WebGL2RenderingContext`.
`WebGLSampler` objects are not available in WebGL 1.

```js
const sampler = gl.createSampler();
```

## See also

- `WebGLSampler`
