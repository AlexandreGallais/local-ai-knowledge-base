---
title: "WebGL2RenderingContext: framebufferTextureLayer() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webgl2renderingcontext/framebuffertexturelayer/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGL2RenderingContext: framebufferTextureLayer() method

The **`WebGL2RenderingContext.framebufferTextureLayer()`**
method of the WebGL 2 API attaches a single
layer of a texture to a framebuffer.

This method is similar to `WebGLRenderingContext.framebufferTexture2D()`,
but only a given single layer of the texture level is attached to the attachment point.

## Syntax

```js
framebufferTextureLayer(target, attachment, texture, level, layer)
```

### Parameters

- `target`
    A `GLenum` specifying the binding point (target). Possible values:
    - `gl.FRAMEBUFFER`: Collection buffer data storage of color, alpha,
      depth and stencil buffers used to render an image.
    - `gl.DRAW_FRAMEBUFFER`: Equivalent to `gl.FRAMEBUFFER`.
    - `gl.READ_FRAMEBUFFER`: Used as a source for reading operations.

- `attachment`
    A `GLenum` specifying the attachment point for the
    `texture`. Possible values:
    - `gl.COLOR_ATTACHMENT{0-15}`: Attaches the texture to one of the
      framebuffer's color buffers.
    - `gl.DEPTH_ATTACHMENT`: Attaches the texture to the framebuffer's
      depth buffer.
    - `gl.STENCIL_ATTACHMENT`: Attaches the texture to the framebuffer's
      stencil buffer.
    - `gl.DEPTH_STENCIL_ATTACHMENT`: depth and stencil buffer.

- `texture`
    A `WebGLTexture` object whose image to attach.
- `level`
    A `GLint` specifying the mipmap level of the texture image to attach.
- `layer`
    A `GLint` specifying the layer of the texture image to attach.

### Return value

None (`undefined`).

## Examples

```js
gl.framebufferTextureLayer(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, texture, 0, 8);
```

## See also

- `WebGLRenderingContext.framebufferTexture2D()`
