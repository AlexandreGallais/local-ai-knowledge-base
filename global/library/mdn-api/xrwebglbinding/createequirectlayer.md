---
title: "XRWebGLBinding: createEquirectLayer() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrwebglbinding/createequirectlayer/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRWebGLBinding: createEquirectLayer() method

The **`createEquirectLayer()`** method of the `XRWebGLBinding` interface returns an `XREquirectLayer` object, which is a layer that maps equirectangular coded data onto the inside of a sphere.

## Syntax

```js
createEquirectLayer(options)
```

### Parameters

- `options`
    An object to configure the `XREquirectLayer`. It must have the `space`, `viewPixelHeight`, and `viewPixelWidth` properties. `init` has the following properties:
    - `centralHorizontalAngle` (optional)
        A number indicating the central horizontal angle in radians of the sphere. Default value: `6.28318` (2π).
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
          Additionally, for contexts with the `WEBGL_compressed_texture_etc` extension enabled:
        - `ext.COMPRESSED_RGB8_ETC2`
        - `ext.COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2`
        - `ext.COMPRESSED_RGBA8_ETC2_EAC`
        - `ext.COMPRESSED_SRGB8_ETC2`
        - `ext.COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2`
        - `ext.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC`
          Additionally, for contexts with the `WEBGL_compressed_texture_astc` extension enabled:
        - `All` of the formats the extension supports.
          The default value is `gl.RGBA`.
    - `depthFormat` (optional)
        A `GLenum` defining the data type of the depth texture data, or else `0` to indicate that the layer should not provide a depth texture (in that case `XRProjectionLayer.ignoreDepthValues` will be `true`).
        Possible values within `WebGLRenderingContext` contexts with the `WEBGL_depth_texture` extension enabled, or within `WebGL2RenderingContext` contexts (no extension required):
        - `gl.DEPTH_COMPONENT`
        - `gl.DEPTH_STENCIL`
          Additionally, for `WebGL2RenderingContext` contexts:
        - `gl.DEPTH_COMPONENT24`
        - `gl.DEPTH24_STENCIL24`
          The default value is `gl.DEPTH_COMPONENT`.
    - `isStatic` (optional)
        A boolean that, if true, indicates you can only draw to this layer when `needsRedraw` is `true`. The default value is `false`.
    - `layout` (optional)
        A string indicating the layout of the layer. Possible values:
        - `default`
            The layer accommodates all views of the session.
        - `mono`
            A single `XRSubImage` is allocated and presented to both eyes.
        - `stereo`
            The user agent decides how it allocates the `XRSubImage` (one or two) and the layout (top/bottom or left/right).
        - `stereo-left-right`
            A single `XRSubImage` is allocated. Left eye gets the left area of the texture, right eye the right.
        - `stereo-top-bottom`
            A single `XRSubImage` is allocated. Left eye gets the top area of the texture, right eye the bottom.
            The default value is `mono`.
    - `lowerVerticalAngle` (optional)
        A number indicating the lower vertical angle in radians of the sphere. Default value: `-1.570795` (-π/2).
    - `mipLevels` (optional)
        A number specifying desired number of mip levels. The default value is `1`.
    - `radius` (optional)
        A number indicating the radius of the sphere. Default value: `0` (infinite sphere).
    - `space` **Required**
        An `XRSpace` object defining the layer's spatial relationship with the user's physical environment.
    - `textureType` (optional)
        A string defining the type of texture the layer will have. Possible values:
        - `texture`
            The textures of `XRWebGLSubImage` will be of type `gl.TEXTURE_2D`.
        - `texture-array`
            The textures of `XRWebGLSubImage` will be of type `gl.TEXTURE_2D_ARRAY` (WebGL 2 contexts only).
            The default value is `texture`.
    - `transform` (optional)
        An `XRRigidTransform` object defining the offset and orientation relative to `space`.
    - `upperVerticalAngle` (optional)
        A number indicating the upper vertical angle in radians of the sphere. Default value: `1.570795` (π/2).
    - `viewPixelHeight` **Required**
        A number specifying the pixel height of the layer view.
    - `viewPixelWidth` **Required**
        A number specifying the pixel width of the layer view.

### Return value

An `XREquirectLayer` object.

## Examples

### Creating an `XREquirectLayer`

Configure the equirect layer using the properties listed above in a call to `createEquirect()`. To present layers to the XR device, add them to the `layers` render state using `XRSession.updateRenderState()`.

```js
function onXRSessionStarted(xrSession) {
  const glCanvas = document.createElement("canvas");
  const gl = glCanvas.getContext("webgl2", { xrCompatible: true });
  const xrGlBinding = new XRWebGLBinding(xrSession, gl);
  const equirectLayer = xrGlBinding.createEquirectLayer({
    space: xrReferenceSpace,
    viewPixelWidth: 1200,
    viewPixelHeight: 600,
    centralHorizontalAngle: 2 * Math.PI,
    upperVerticalAngle: Math.PI / 2.0,
    lowerVerticalAngle: -Math.PI / 2.0,
    radius: 0,
  });

  xrSession.updateRenderState({
    layers: [equirectLayer],
  });
}
```

## See also

- `XREquirectLayer`
- WebGL constants
