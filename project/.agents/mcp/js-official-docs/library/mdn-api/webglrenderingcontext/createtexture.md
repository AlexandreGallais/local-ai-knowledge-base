---
title: "WebGLRenderingContext: createTexture() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webglrenderingcontext/createtexture/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGLRenderingContext: createTexture() method

The **`WebGLRenderingContext.createTexture()`** method of the
WebGL API creates and initializes a
`WebGLTexture` object.

## Syntax

```js
createTexture()
```

### Parameters

None.

### Return value

A `WebGLTexture` object to which images can be bound to.

## Examples

See also the WebGL tutorial on Using textures in WebGL.

### Creating a texture

```js
const canvas = document.getElementById("canvas");
const gl = canvas.getContext("webgl");
const texture = gl.createTexture();
```

## See also

- `WebGLRenderingContext.bindTexture()`
- `WebGLRenderingContext.deleteTexture()`
- `WebGLRenderingContext.isTexture()`
- `WebGLRenderingContext.texImage2D()`
