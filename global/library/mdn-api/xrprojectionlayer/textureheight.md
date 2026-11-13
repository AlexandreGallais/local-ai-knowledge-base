---
title: "XRProjectionLayer: textureHeight property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrprojectionlayer/textureheight/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRProjectionLayer: textureHeight property

The read-only **`textureHeight`** property of the `XRProjectionLayer` interface indicates the height in pixels of the color textures of this layer.

The projection layer's texture height is determined by the user agent or the device. It is reported in the `XRSubImage`, which can only be accessed inside the frame loop. If you want to manage your own depth buffers and don't want to wait for first frame after layer creation to determine the required dimensions for those buffers, the `textureHeight` property allows access to layer texture height outside the frame loop. Allocation of these buffers can happen directly after layer creation.

## Value

A number indicating the height in pixels.

## Examples

### Using `textureHeight`

The `textureHeight` of a layer is useful when creating render buffers for a layer. See also `WebGL2RenderingContext.renderbufferStorageMultisample()`.

```js
let glLayer = xrGLBinding.createProjectionLayer();

let colorRB = gl.createRenderbuffer();
gl.bindRenderbuffer(gl.RENDERBUFFER, colorRB);
gl.renderbufferStorageMultisample(
  gl.RENDERBUFFER,
  samples,
  gl.RGBA8,
  glLayer.textureWidth,
  glLayer.textureHeight,
);
```

## See also

- `XRWebGLBinding.createProjectionLayer()`
- `WebGL2RenderingContext.renderbufferStorageMultisample()`
- `XRSubImage`
