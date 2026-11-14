---
title: "WebGL2RenderingContext: getSamplerParameter() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webgl2renderingcontext/getsamplerparameter/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGL2RenderingContext: getSamplerParameter() method

The **`WebGL2RenderingContext.getSamplerParameter()`** method
of the WebGL 2 API returns parameter
information of a `WebGLSampler` object.

## Syntax

```js
getSamplerParameter(sampler, pname)
```

### Parameters

- `sampler`
    A `WebGLSampler` object.
- `pname`
    A `GLenum` specifying which information to return. Possible values:
    - `gl.TEXTURE_COMPARE_FUNC`: Returns a `GLenum` indicating
      the texture comparison function.
    - `gl.TEXTURE_COMPARE_MODE`: Returns a `GLenum` indicating
      the texture comparison mode.
    - `gl.TEXTURE_MAG_FILTER`: Returns a `GLenum` indicating
      the texture magnification filter.
    - `gl.TEXTURE_MAX_LOD`: Returns a `GLfloat` indicating the
      maximum level-of-detail value.
    - `gl.TEXTURE_MIN_FILTER`: Returns a `GLenum` indicating
      the texture minification filter
    - `gl.TEXTURE_MIN_LOD`: Returns a `GLfloat` indicating the
      minimum level-of-detail value.
    - `gl.TEXTURE_WRAP_R`: Returns a `GLenum` indicating the
      texture wrapping function for the texture coordinate r.
    - `gl.TEXTURE_WRAP_S`: Returns a `GLenum` indicating the
      texture wrapping function for the texture coordinate s.
    - `gl.TEXTURE_WRAP_T`: Returns a `GLenum` indicating the
      texture wrapping function for the texture coordinate t.

### Return value

Depends on the `pname` parameter, either a `GLenum` or a
`GLfloat`.

## Examples

```js
const sampler = gl.createSampler();
gl.getSamplerParameter(sampler, gl.TEXTURE_COMPARE_FUNC);
```

## See also

- `WebGLSampler`
