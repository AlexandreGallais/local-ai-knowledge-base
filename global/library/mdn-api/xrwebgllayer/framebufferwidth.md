---
title: "XRWebGLLayer: framebufferWidth property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrwebgllayer/framebufferwidth/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRWebGLLayer: framebufferWidth property

The read-only `XRWebGLLayer` property
**`framebufferWidth`** specifies the width of the framebuffer,
in pixels.

You can get the height of the framebuffer using the
`framebufferHeight` property.

## Value

The width in pixels of the XR device's framebuffer. Each of the framebuffer's
attachments (pixel, depth, color, and/or stencil buffers, for example) are all this many
pixels wide.

## Examples

This snippet fetches the framebuffer's width and height for later use.

```js
let glLayer = xrSession.renderState.baseLayer;
gl.bindFramebuffer(gl.FRAMEBUFFER, glLayer.framebuffer);

frameWidth = glLayer.framebufferWidth;
frameHeight = glLayer.framebufferHeight;
```

## See also

- WebXR Device API
