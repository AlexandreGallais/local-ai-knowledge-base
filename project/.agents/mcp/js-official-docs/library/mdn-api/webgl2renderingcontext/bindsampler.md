---
title: "WebGL2RenderingContext: bindSampler() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webgl2renderingcontext/bindsampler/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGL2RenderingContext: bindSampler() method

The **`WebGL2RenderingContext.bindSampler()`** method of the WebGL 2 API binds a
passed `WebGLSampler` object to the texture unit at the passed index.

## Syntax

```js
bindSampler(unit, sampler)
```

### Parameters

- `unit`
    A `GLuint` specifying the index of the texture unit to which to bind
    the sampler to.
- `sampler`
    A `WebGLSampler` object to bind.

### Return value

None (`undefined`).

## Examples

```js
const sampler = gl.createSampler();
gl.bindSampler(0, sampler);
```

## See also

- `WebGLSampler`
