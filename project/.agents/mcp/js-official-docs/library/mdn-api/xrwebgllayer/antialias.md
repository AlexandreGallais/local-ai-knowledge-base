---
title: "XRWebGLLayer: antialias property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrwebgllayer/antialias/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRWebGLLayer: antialias property

The read-only `XRWebGLLayer` property
**`antialias`** is a Boolean value which is `true`
if the rendering layer's frame buffer supports anti-aliasing. Otherwise, this
property's value is `false`. The specific anti-aliasing technique used is left
to the user agent's discretion and cannot be specified by
the website or web app.

## Value

A Boolean value which is `true` if the WebGL rendering layer's frame buffer
is configured to support anti-aliasing. Otherwise, this property is `false`.

When the WebXR compositor is enabled, this value corresponds to the value of the
`antialias` property on the object returned by the WebGL context's
`getContentAttributes()`
method.

## Usage notes

Since this is a read-only property, you can set the anti-aliasing mode only when
initially creating the `XRWebGLLayer`, by specifying the `antialias`
property in the `XRWebGLLayer()`
constructor's `options` configuration object.

## Examples

This snippet checks the value of `antialias` to see if it should perform
additional work to attempt to compensate for the lack of anti-aliasing on the WebGL
layer.

```js
let glLayer = xrSession.renderState.baseLayer;
gl.bindFrameBuffer(gl.FRAMEBUFFER, glLayer.framebuffer);

/* .. */

if (!glLayer.antialias) {
  /* compensate for lack of anti-aliasing */
}
```

## See also

- WebXR Device API
