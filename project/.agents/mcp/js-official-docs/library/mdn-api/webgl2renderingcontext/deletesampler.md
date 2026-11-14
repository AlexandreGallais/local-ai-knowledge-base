---
title: "WebGL2RenderingContext: deleteSampler() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webgl2renderingcontext/deletesampler/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGL2RenderingContext: deleteSampler() method

The **`WebGL2RenderingContext.deleteSampler()`** method of the
WebGL 2 API deletes a given
`WebGLSampler` object.

## Syntax

```js
deleteSampler(sampler)
```

### Parameters

- `sampler`
    A `WebGLSampler` object to delete.

### Return value

None (`undefined`).

## Examples

`gl` must be a `WebGL2RenderingContext`.
`WebGLSampler` objects are not available in WebGL 1.

```js
const sampler = gl.createSampler();

// …

gl.deleteSampler(sampler);
```

## See also

- `WebGLSampler`
