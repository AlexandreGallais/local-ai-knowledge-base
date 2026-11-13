---
title: "XRWebGLBinding: getSubImage() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrwebglbinding/getsubimage/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRWebGLBinding: getSubImage() method

The **`getSubImage()`** method of the `XRWebGLBinding` interface returns a `XRWebGLSubImage` object representing the WebGL texture to render.

## Syntax

```js
getSubImage(layer, frame)
getSubImage(layer, frame, eye)
```

### Parameters

- `layer`
    The `XRCompositionLayer` to use for rendering (can be all types of `XRCompositionLayer` objects except `XRProjectionLayer`, see `XRWebGLBinding.getViewSubImage()` for rendering projection layers).
- `frame`
    The `XRFrame` frame to use for rendering.
- `eye` (optional)
    An optional `XRView.eye` indicating which view's eye to use for rendering. Possible values:
    - `left`
        The `XRView` represents the point-of-view of the viewer's left eye.
    - `right`
        The view represents the viewer's right eye.
    - `none`
        The view describes a monoscopic view, or the view otherwise doesn't represent a particular eye's point-of-view.
        Defaults to `none`.

### Return value

A `XRWebGLSubImage` object.

### Exceptions

A `TypeError` is thrown,

- if `layer` is not in the session's `layer` array.
- if `layer` is a `XRProjectionLayer`.
- if the layer's `layout` property is `default`.
- if the layer's `layout` property is `stereo` and `eye` is `none`.

## Examples

### Rendering an `XRQuadLayer`

The following example renders an `XRQuadLayer`.

```js
const xrGlBinding = new XRWebGLBinding(xrSession, gl);
const quadLayer = xrGlBinding.createQuadLayer({
  space: xrReferenceSpace,
  viewPixelWidth: 512,
  viewPixelHeight: 512,
});

// Position 2 meters away from the origin with a width and height of 1.5 meters
quadLayer.transform = new XRRigidTransform({ z: -2 });
quadLayer.width = 1.5;
quadLayer.height = 1.5;

const framebuffer = gl.createFramebuffer();
xrSession.updateRenderState({ layers: [quadLayer] });
xrSession.requestAnimationFrame(onXRFrame);

function onXRFrame(time, xrFrame) {
  xrSession.requestAnimationFrame(onXRFrame);

  gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
  let subImage = xrGlBinding.getSubImage(quadLayer, xrFrame);
  gl.framebufferTexture2D(
    gl.FRAMEBUFFER,
    gl.COLOR_ATTACHMENT0,
    subImage.colorTexture,
    0,
  );
  let viewport = subImage.viewport;
  gl.viewport(viewport.x, viewport.y, viewport.width, viewport.height);

  // Render content for the quad layer
}
```

## See also

- `XRWebGLSubImage`
