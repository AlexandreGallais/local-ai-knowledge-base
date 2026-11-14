---
title: "XRWebGLBinding: getViewSubImage() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrwebglbinding/getviewsubimage/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRWebGLBinding: getViewSubImage() method

The **`getViewSubImage()`** method of the `XRWebGLBinding` interface returns a `XRWebGLSubImage` object representing the WebGL texture to render for a view.

## Syntax

```js
getViewSubImage(layer, view)
```

### Parameters

- `layer`
    The `XRProjectionLayer` to use for rendering (to render other layer types, see `XRWebGLBinding.getSubImage()`).
- `view`
    The `XRView` to use for rendering.

### Return value

A `XRWebGLSubImage` object.

### Exceptions

A `TypeError` is thrown,

- if `layer` is not in the session's `layer` array.

## Examples

### Rendering an `XRProjectionLayer`

The following example renders an `XRProjectionLayer` to a view.

```js
const xrGlBinding = new XRWebGLBinding(xrSession, gl);
const layer = xrGlBinding.createProjectionLayer({});
const framebuffer = gl.createFramebuffer();

xrSession.updateRenderState({ layers: [layer] });
xrSession.requestAnimationFrame(onXRFrame);

function onXRFrame(time, xrFrame) {
  xrSession.requestAnimationFrame(onXRFrame);

  gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);

  for (const view in xrViewerPose.views) {
    const subImage = xrGlBinding.getViewSubImage(layer, view);
    gl.framebufferTexture2D(
      gl.FRAMEBUFFER,
      gl.COLOR_ATTACHMENT0,
      gl.TEXTURE_2D,
      subImage.colorTexture,
      0,
    );
    gl.framebufferTexture2D(
      gl.FRAMEBUFFER,
      gl.DEPTH_ATTACHMENT,
      gl.TEXTURE_2D,
      subImage.depthStencilTexture,
      0,
    );
    const viewport = subImage.viewport;
    gl.viewport(viewport.x, viewport.y, viewport.width, viewport.height);

    // Render from the viewpoint of xrView
  }
}
```

## See also

- `XRWebGLSubImage`
