---
title: "XRWebGLBinding: getReflectionCubeMap() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrwebglbinding/getreflectioncubemap/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRWebGLBinding: getReflectionCubeMap() method

The **`getReflectionCubeMap()`** method of the `XRWebGLBinding` interface returns a `WebGLTexture` object containing a reflection cube map texture.

The texture format is specified by the session's `reflectionFormat`. See the `options` parameter on `XRSession.requestLightProbe()` and `XRSession.preferredReflectionFormat` for more details. By default, the `srgba8` format is used. When using a `rgba16f` format, you need to be within a WebGL 2.0 context or enable the `OES_texture_half_float` extension within WebGL 1.0 contexts.

## Syntax

```js
getReflectionCubeMap(lightProbe)
```

### Parameters

- `lightProbe`
    An `XRLightProbe` object returned by calling `XRSession.requestLightProbe()`.

### Return value

A `WebGLTexture` object.

## Examples

You typically call `getReflectionCubeMap()` whenever the `reflectionchange` event fires on a light probe to retrieve an updated cube map. This is less expensive than retrieving lighting information with every `XRFrame`.

If the `rgba16f` format is used, enable the `OES_texture_half_float` extension within WebGL 1.0 contexts.

```js
const glBinding = new XRWebGLBinding(xrSession, gl);
gl.getExtension("OES_texture_half_float"); // if rgba16f is the preferredReflectionFormat

xrSession.requestLightProbe().then((lightProbe) => {
  lightProbe.addEventListener("reflectionchange", () => {
    glBinding.getReflectionCubeMap(lightProbe);
  });
});
```

## See also

- `XRLightProbe`
- `OES_texture_half_float`
