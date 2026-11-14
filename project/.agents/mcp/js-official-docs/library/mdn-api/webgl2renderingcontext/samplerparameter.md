---
title: "WebGL2RenderingContext: samplerParameter[if]() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webgl2renderingcontext/samplerparameter/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGL2RenderingContext: samplerParameter[if]() method

The **`WebGL2RenderingContext.samplerParameterif`** methods
of the WebGL 2 API set
`WebGLSampler` parameters.

## Syntax

```js
samplerParameteri(sampler, pname, param)
samplerParameterf(sampler, pname, param)
```

### Parameters

- `sampler`
    A `WebGLSampler` object.
- `pname`
    A `GLenum` specifying which parameter to set. Possible values:
    - `gl.TEXTURE_COMPARE_FUNC`
        A `GLenum` specifying the
        texture comparison function.
    - `gl.TEXTURE_COMPARE_MODE`
        A `GLenum` specifying the
        texture comparison mode.
    - `gl.TEXTURE_MAG_FILTER`
        A `GLenum` specifying the
        texture magnification filter.
    - `gl.TEXTURE_MAX_LOD`
        A `GLfloat` specifying the maximum
        level-of-detail value.
    - `gl.TEXTURE_MIN_FILTER`
        A `GLenum` specifying the
        texture minification filter
    - `gl.TEXTURE_MIN_LOD`
        A `GLfloat` specifying the minimum
        level-of-detail value.
    - `gl.TEXTURE_WRAP_R`
        A `GLenum` specifying the texture
        wrapping function for the texture coordinate r.
    - `gl.TEXTURE_WRAP_S`
        A `GLenum` specifying the texture
        wrapping function for the texture coordinate s.
    - `gl.TEXTURE_WRAP_T`
        A `GLenum` specifying the texture
        wrapping function for the texture coordinate t.

- `param`
    A `GLint` (`samplerParameteri`) or a `GLfloat`
    (`samplerParameterf`) specifying a value for `pname`.

### Return value

None (`undefined`).

## Examples

```js
const sampler = gl.createSampler();
gl.samplerParameteri(sampler, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
```

## See also

- `WebGLSampler`
