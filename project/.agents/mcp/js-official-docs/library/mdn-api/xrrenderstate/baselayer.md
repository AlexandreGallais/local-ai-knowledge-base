---
title: "XRRenderState: baseLayer property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrrenderstate/baselayer/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRRenderState: baseLayer property

The read-only **`baseLayer`** property of the
`XRRenderState` interface returns the `XRWebGLLayer` instance
that is the source of bitmap images and a description of how the image is to be rendered
in the device.

This property is read-only; however, you can indirectly change its
value using `XRSession.updateRenderState`.

## Value

A `XRWebGLLayer` object which is used as the source of the world's
contents when rendering each frame of the scene.

See the examples below to see how to use `updateRenderState()` to set the current `XRWebGLLayer` used for rendering
the scene.

## Examples

You can set the `XRWebGLLayer` used for rendering by calling
`updateRenderState()`, like this:

```js
let canvas = document.querySelector("canvas");
gl = canvas.getContext("webgl", { xrCompatible: true });
setNewWebGLLayer();

function setNewWebGLLayer(gl) {
  if (!gl) {
    /* WebGL not available */
    return;
  }

  xrSession.updateRenderState({
    baseLayer: new XRWebGLLayer(xrSession, gl),
  });
}
```

Here, the canvas obtained in the first line is the canvas into which WebGL is going to
draw. That context is passed into `XRWebGLLayer()` to create an `XRWebGLLayer` which uses the contents of the
WebGL context `gl` as the source of the world's image during presentation.
