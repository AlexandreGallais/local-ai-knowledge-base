---
title: "XRWebGLDepthInformation: texture property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrwebgldepthinformation/texture/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRWebGLDepthInformation: texture property

The _read-only_ **`texture`** property of the `XRWebGLDepthInformation` interface is a `WebGLTexture` containing depth buffer information as an opaque texture.

## Value

A `WebGLTexture`.

## Examples

Use `XRWebGLBinding.getDepthInformation()` to obtain GPU depth information. The returned `XRWebGLDepthInformation` object will contain the `texture` buffer which can then be bound to a texture and depth buffer information can be made available to a WebGL fragment shader.

```js
const depthInfo = glBinding.getDepthInformation(view);
const uvTransform = depthInfo.normDepthBufferFromNormView.matrix;

const uDepthTextureLocation = gl.getUniformLocation(program, "u_DepthTexture");
const uUVTransformLocation = gl.getUniformLocation(program, "u_UVTransform");
const uRawValueToMeters = gl.getUniformLocation(program, "u_RawValueToMeters");

gl.bindTexture(gl.TEXTURE_2D, depthInfo.texture);
gl.activeTexture(gl.TEXTURE0);
gl.uniform1i(uDepthTextureLocation, 0);

// UV transform to correctly index into the depth map
gl.uniformMatrix4fv(uUVTransformLocation, false, uvTransform);

// scaling factor to convert from the raw number to meters
gl.uniform1f(uRawValueToMeters, depthInfo.rawValueToMeters);
```

## See also

- `XRWebGLBinding.getDepthInformation()`
- `WebGLRenderingContext.bindTexture()`
