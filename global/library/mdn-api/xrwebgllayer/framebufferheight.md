---
title: "XRWebGLLayer: framebufferHeight property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrwebgllayer/framebufferheight/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRWebGLLayer: framebufferHeight property

The read-only `XRWebGLLayer` property
**`framebufferHeight`** indicates the height of the
framebuffer, in pixels.

You can get the width of the framebuffer using the
`framebufferWidth` property.

## Value

The height in pixels of the XR device's framebuffer. Each of the framebuffer's
attachments (pixel, depth, color, and/or stencil buffers, for example) are all this many
pixels tall.

## Examples

This snippet fetches the framebuffer's width and height for later use.

```js
let glLayer = xrSession.renderState.baseLayer;
gl.bindFramebuffer(gl.FRAMEBUFFER, glLayer.framebuffer);

frameWidth = glLayer.framebufferHeight;
frameHeight = glLayer.framebufferHeight;
```

## See also

- WebXR Device API
