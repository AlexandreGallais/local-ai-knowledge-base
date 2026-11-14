---
title: "XRWebGLBinding: createProjectionLayer() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrwebglbinding/createprojectionlayer/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRWebGLBinding: createProjectionLayer() method

The **`createProjectionLayer()`** method of the `XRWebGLBinding` interface returns an `XRProjectionLayer` object which is a layer that fills the entire view of the observer and is refreshed close to the device's native frame rate.

## Syntax

```js
createProjectionLayer(options)
```

### Parameters

- `options`
    An object to configure the `XRProjectionLayer`.
    - `textureType` (optional)
        A string defining the type of texture the layer will have. Possible values:
        - `texture`
            The textures of `XRWebGLSubImage` will be of type `gl.TEXTURE_2D`.
        - `texture-array`
            The textures of `XRWebGLSubImage` will be of type `gl.TEXTURE_2D_ARRAY` (WebGL 2 contexts only).
            The default value is `texture`.
    - `colorFormat` (optional)
        A `GLenum` defining the data type of the color texture data. Possible values:
        - `gl.RGB`
        - `gl.RGBA`
          Additionally, for contexts with the `EXT_sRGB` extension enabled:
        - `ext.SRGB_EXT`
        - `ext.SRGB_ALPHA_EXT`
          Additionally, for `WebGL2RenderingContext` contexts:
        - `gl.RGBA8`
        - `gl.RGB8`
        - `gl.SRGB8`
        - `gl.RGB8_ALPHA8`
          The default value is `gl.RGBA`.
    - `depthFormat` (optional)
        A `GLenum` defining the data type of the depth texture data or `0` indicating that the layer should not provide a depth texture. (In that case `XRProjectionLayer.ignoreDepthValues` will be `true`.)
        Possible values within `WebGLRenderingContext` contexts with the `WEBGL_depth_texture` extension enabled, or within `WebGL2RenderingContext` contexts (no extension required):
        - `gl.DEPTH_COMPONENT`
        - `gl.DEPTH_STENCIL`
          Additionally, for `WebGL2RenderingContext` contexts:
        - `gl.DEPTH_COMPONENT24`
        - `gl.DEPTH24_STENCIL24`
          The default value is `gl.DEPTH_COMPONENT`.
    - `scaleFactor` (optional)
        A floating-point value which is used to scale the layer during compositing. A value of `1.0` represents the default pixel size for the frame buffer. (See also `XRWebGLLayer.getNativeFramebufferScaleFactor()`.) Unlike other layers, the `XRProjectionLayer` can't be created with an explicit pixel width and height, because the size is inferred by the hardware. (Projection layers fill the observer's entire view.)

### Return value

An `XRProjectionLayer` object.

## Examples

### Creating an `XRProjectionLayer` in a WebGL 2 context

The `textureType` option allows allocating a texture array instead, in which every `XRView` will be rendered into a separate level of the array. This allows for some rendering optimizations, such as the use of the `OVR_multiview2` extension available in WebGL 2 contexts.

```js
function onXRSessionStarted(xrSession) {
  const glCanvas = document.createElement("canvas");
  const gl = glCanvas.getContext("webgl2", { xrCompatible: true });
  const xrGlBinding = new XRWebGLBinding(xrSession, gl);
  const projectionLayer = xrGlBinding.createProjectionLayer({
    textureType: "texture-array",
  });
  xrSession.updateRenderState({
    layers: [projectionLayer],
  });
}
```

## See also

- `XRProjectionLayer`
- WebGL constants
