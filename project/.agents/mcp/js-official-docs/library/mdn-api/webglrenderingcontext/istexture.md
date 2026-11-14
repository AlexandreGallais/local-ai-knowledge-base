---
title: "WebGLRenderingContext: isTexture() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webglrenderingcontext/istexture/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGLRenderingContext: isTexture() method

The **`WebGLRenderingContext.isTexture()`** method of the WebGL API returns `true` if the
passed `WebGLTexture` is valid and `false` otherwise.

## Syntax

```js
isTexture(texture)
```

### Parameters

- `texture`
    A `WebGLTexture` to check.

### Return value

A `GLboolean` indicating whether or not the texture is valid.

## Examples

### Checking a texture

```js
const canvas = document.getElementById("canvas");
const gl = canvas.getContext("webgl");
const texture = gl.createTexture();

gl.isTexture(texture);
```

## See also

- `WebGLRenderingContext.bindTexture()`
- `WebGLRenderingContext.createTexture()`
- `WebGLRenderingContext.deleteTexture()`
- `WebGLRenderingContext.texImage2D()`
