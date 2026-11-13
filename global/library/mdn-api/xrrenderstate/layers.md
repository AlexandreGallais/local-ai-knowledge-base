---
title: "XRRenderState: layers property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrrenderstate/layers/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRRenderState: layers property

The read-only **`layers`** property of the `XRRenderState` interface is an ordered array containing `XRLayer` objects that are displayed by the XR compositor.

## Value

An ordered array containing `XRLayer` objects. The order of the layers is "back-to-front".

## Examples

### Getting render state layers

To read the WebXR layers array, use the `layers` property on `XRRenderState`.
Layers can be set using the `XRSession.updateRenderState()` method.

```js
const xrSession = navigator.xr.requestSession("immersive-ar", {
  optionalFeatures: ["layers"],
});

function onXRSessionStarted(xrSession) {
  const glCanvas = document.createElement("canvas");
  const gl = glCanvas.getContext("webgl", { xrCompatible: true });
  const xrGlBinding = new XRWebGLBinding(xrSession, gl);
  const projectionLayer = new XRWebGLLayer(xrSession, gl);
  const quadLayer = xrGlBinding.createQuadLayer({
    pixelWidth: 1024,
    pixelHeight: 1024,
  });

  xrSession.updateRenderState({
    layers: [projectionLayer, quadLayer],
  });

  xrSession.renderState.layers; // [projectionLayer, quadLayer]
}
```

## See also

- `XRSession.updateRenderState()`
