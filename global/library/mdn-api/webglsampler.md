---
title: "WebGLSampler"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webglsampler/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGLSampler

The **`WebGLSampler`** interface is part of the WebGL 2 API and stores sampling parameters for `WebGLTexture` access inside of a shader.

When working with `WebGLSampler` objects, the following methods of the `WebGL2RenderingContext` are useful:

- `WebGL2RenderingContext.createSampler()`
- `WebGL2RenderingContext.deleteSampler()`
- `WebGL2RenderingContext.isSampler()`
- `WebGL2RenderingContext.bindSampler()`
- `WebGL2RenderingContext.getSamplerParameter()`

## Examples

### Creating a `WebGLSampler` object

in this example, `gl` must be a `WebGL2RenderingContext`. `WebGLSampler` objects are not available in WebGL 1.

```js
const sampler = gl.createSampler();
```
