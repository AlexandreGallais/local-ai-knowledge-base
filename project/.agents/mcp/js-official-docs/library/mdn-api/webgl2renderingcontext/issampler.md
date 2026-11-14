---
title: "WebGL2RenderingContext: isSampler() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webgl2renderingcontext/issampler/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGL2RenderingContext: isSampler() method

The **`WebGL2RenderingContext.isSampler()`** method of the WebGL 2 API returns `true` if the
passed object is a valid `WebGLSampler` object.

## Syntax

```js
isSampler(sampler)
```

### Parameters

- `sampler`
    A `WebGLSampler` object to test.

### Return value

A `GLboolean` indicating whether the given object is a valid
`WebGLSampler` object (`true`) or not (`false`).

## Examples

`gl` must be a `WebGL2RenderingContext`.
`WebGLSampler` objects are not available in WebGL 1.

```js
const sampler = gl.createSampler();

// …

gl.isSampler(sampler);
```

## See also

- `WebGLSampler`
