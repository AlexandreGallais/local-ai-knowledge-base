---
title: "XRWebGLLayer: framebuffer property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrwebgllayer/framebuffer/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRWebGLLayer: framebuffer property

The read-only `XRWebGLLayer` property
**`framebuffer`** is an opaque `WebGLFramebuffer`
which is used to buffer the rendered image if the XR compositor is being used. Otherwise, this property's value is
`null`. The opaque framebuffer is functionally nearly the same as a
standard WebGL framebuffer, except for the differences covered in the section
How opaque framebuffers are special below.

## Value

A `WebGLFramebuffer` object representing the framebuffer into which the 3D
scene is being rendered, or `null` if the XR compositor is disabled for the session.

## Usage notes

### How opaque framebuffers are special

The framebuffer represented by the `framebuffer` property is opaque. As
such, its behavior is different in several ways from a standard WebGL context. These
differences cause the opaque framebuffer to behave more like the default WebGL
framebuffer:

- Opaque framebuffers _may_ support anti-aliasing, even under
  WebGL 1.0, which don't normally do so.
- Opaque framebuffers' attachments (buffers and the like) can't be inspected or
  changed. Calling functions such as
  `framebufferTexture2D()`,
  `framebufferRenderbuffer()`,
  `deleteFramebuffer()`, or
  `getFramebufferAttachmentParameter()`
  on an opaque framebuffer results in the WebGL error `INVALID_OPERATION` (`0x0502`).
- Opaque framebuffers are considered incomplete and are not available for rendering
  other than while executing the `requestAnimationFrame()` callback.
  Attempting to clear, draw to, or read from the framebuffer results in a WebGL `INVALID_FRAMEBUFFER_OPERATION` error (`0x0506`).
  Calling `checkFramebufferStatus()` on the WebGL context from outside the animation frame
  callback causes the WebGL `FRAMEBUFFER_UNSUPPORTED` error (`0x8CDD`) to be reported.
- Opaque framebuffers initialized with the `depth` property set to `false` will not have a depth buffer and will
  rely on the coordinates alone to determine distance.
- Opaque framebuffers initialized without specifying a `stencil` property will not have a stencil buffer.
- Opaque framebuffers will not have an alpha channel available unless the `alpha` property is `true` when
  creating the layer.
- The XR compositor assumes that opaque framebuffers use colors with premultiplied
  alpha, regardless of whether or not the WebGL context's `premultipliedAlpha` context
  attribute is set.

> **Note:**
> The `depth` and `stencil` properties are
> not required to be supported in order for a browser to be construed as having full
> WebGL support.

### The default configuration of a new framebuffer

Upon creating a new `XRWebGLLayer`, its new framebuffer is initialized
just like the default framebuffer for any WebGL interface:

- The color buffer is configured with its clear value set to the color (0, 0, 0, 0)
  (meaning transparent black).
- The depth buffer's clear value is the number 1.0.
- The stencil buffer is filled with 0.

## Examples

This example gets the `XRWebGLLayer` for a session and then passes its
framebuffer into the WebGL context's `bindFramebuffer()` function.

```js
let glLayer = xrSession.renderState.baseLayer;
gl.bindFramebuffer(gl.FRAMEBUFFER, glLayer.framebuffer);
```

## See also

- WebXR Device API
