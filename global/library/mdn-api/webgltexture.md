---
title: "WebGLTexture"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webgltexture/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGLTexture

The **WebGLTexture** interface is part of the WebGL API and represents an opaque texture object providing storage and state for texturing operations.

## WebGL textures

The `WebGLTexture` object does not define any methods or properties of its own and its content is not directly accessible. When working with `WebGLTexture` objects, the following methods of the `WebGLRenderingContext` are useful:

- `WebGLRenderingContext.bindTexture()`
- `WebGLRenderingContext.createTexture()`
- `WebGLRenderingContext.deleteTexture()`
- `WebGLRenderingContext.isTexture()`

See also the WebGL tutorial on Using textures in WebGL.

## WebXR opaque textures

When using WebXR layers, the `XRWebGLBinding` object will return instances of an _opaque_ `WebGLTexture` for the color and depth/stencil attachments.

WebXR methods that return _opaque_ `WebGLTexture` objects:

- `XRWebGLBinding.getSubImage()`
- `XRWebGLBinding.getViewSubImage()`

The WebXR _opaque texture_ is identical to the standard `WebGLTexture` with the following exceptions:

- A WebXR opaque texture is invalid outside a WebXR `requestAnimationFrame()` callback for its session.
- A WebXR opaque texture is invalid until it is returned by `XRWebGLBinding.getSubImage()` or `XRWebGLBinding.getViewSubImage()`.
- A WebXR opaque texture for the color attachment contains colors with premultiplied alpha.
- At the end of a `requestAnimationFrame()` callback a WebXR opaque texture is unbounded and detached from all `WebGLShader` objects.
- A WebXR opaque texture behaves as though it was allocated with `texStorage2D` or `texStorage3D`, as appropriate, even when using a WebGL 1.0 context.
- If a WebXR opaque texture calls `WebGLRenderingContext.deleteTexture()`, an `INVALID_OPERATION` error is thrown.
- Changes to the dimension or format of a WebXR opaque texture are not allowed. GL functions may only alter the texel values and texture parameters.

## Examples

### Creating a texture

```js
const canvas = document.getElementById("canvas");
const gl = canvas.getContext("webgl");
const texture = gl.createTexture();
```

## See also

- `WebGLRenderingContext.bindTexture()`
- `WebGLRenderingContext.createTexture()`
- `WebGLRenderingContext.deleteTexture()`
- `WebGLRenderingContext.isTexture()`
- `WebGLRenderingContext.compressedTexImage2D()`
- `WebGLRenderingContext.compressedTexSubImage2D()`
- `WebGLRenderingContext.copyTexImage2D()`
- `WebGLRenderingContext.copyTexSubImage2D()`
- `WebGLRenderingContext.generateMipmap()`
- `WebGLRenderingContext.getTexParameter()`
- `WebGLRenderingContext.texImage2D()`
- `WebGLRenderingContext.texSubImage2D()`
- `WebGLRenderingContext.texParameterf()`
- `WebGLRenderingContext.texParameteri()`
