---
title: "WebGLRenderingContext: texParameter[fi]() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webglrenderingcontext/texparameter/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGLRenderingContext: texParameter[fi]() method

The **`WebGLRenderingContext.texParameterfi`** methods of
the WebGL API set texture parameters.

## Syntax

```js
texParameterf(target, pname, param)
texParameteri(target, pname, param)
```

### Parameters

- `target`
    A `GLenum` specifying the binding point (target). Possible values:
    - `gl.TEXTURE_2D`: A two-dimensional texture.
    - `gl.TEXTURE_CUBE_MAP`: A cube-mapped texture.

    When using a `WebGL 2 context`, the following values are available additionally:
    - `gl.TEXTURE_3D`: A three-dimensional texture.
    - `gl.TEXTURE_2D_ARRAY`: A two-dimensional array texture.

- `param`
    The `param` parameter is a `GLfloat` or
    `GLint` specifying the value for the specified parameter

- `pname`
    The `pname` parameter is a `GLenum` specifying the texture
    parameter to set.

       | `pname`
       | Description
       | `param`

       | Available in WebGL 1

       | `gl.TEXTURE_MAG_FILTER`
       | Texture magnification filter
       | `gl.LINEAR` (default value), `gl.NEAREST`.

       | `gl.TEXTURE_MIN_FILTER`
       | Texture minification filter
       |
        `gl.LINEAR`, `gl.NEAREST`,
        `gl.NEAREST_MIPMAP_NEAREST`,
        `gl.LINEAR_MIPMAP_NEAREST`,
        `gl.NEAREST_MIPMAP_LINEAR` (default value),
        `gl.LINEAR_MIPMAP_LINEAR`.

       | `gl.TEXTURE_WRAP_S`
       | Wrapping function for texture coordinate `s`
       |
        `gl.REPEAT` (default value), `gl.CLAMP_TO_EDGE`,
        `gl.MIRRORED_REPEAT`.

       | `gl.TEXTURE_WRAP_T`
       | Wrapping function for texture coordinate `t`
       |
        `gl.REPEAT` (default value), `gl.CLAMP_TO_EDGE`,
        `gl.MIRRORED_REPEAT`.

       |
        Additionally available when using the
        `EXT_texture_filter_anisotropic` extension

       | `ext.TEXTURE_MAX_ANISOTROPY_EXT`
       | Maximum anisotropy for a texture
       | A `GLfloat` value.

       | Additionally available when using a WebGL 2 context

       | `gl.TEXTURE_BASE_LEVEL`
       | Texture mipmap level
       | Any int values.

       | `gl.TEXTURE_COMPARE_FUNC`
       | Texture Comparison function
       |
        `gl.LEQUAL` (default value), `gl.GEQUAL`,
        `gl.LESS`, `gl.GREATER`, `gl.EQUAL`,
        `gl.NOTEQUAL`, `gl.ALWAYS`, `gl.NEVER`.

       | `gl.TEXTURE_COMPARE_MODE`
       | Texture comparison mode
       |
        `gl.NONE` (default value),
        `gl.COMPARE_REF_TO_TEXTURE`.

       | `gl.TEXTURE_MAX_LEVEL`
       | Maximum texture mipmap array level
       | Any int values.

       | `gl.TEXTURE_MAX_LOD`
       | Texture maximum level-of-detail value
       | Any float values.

       | `gl.TEXTURE_MIN_LOD`
       | Texture minimum level-of-detail value
       | Any float values.

       | `gl.TEXTURE_WRAP_R`
       | Wrapping function for texture coordinate `r`
       |
        `gl.REPEAT` (default value), `gl.CLAMP_TO_EDGE`,
        `gl.MIRRORED_REPEAT`.

### Return value

None (`undefined`).

## Examples

```js
gl.texParameterf(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
gl.texParameteri(
  gl.TEXTURE_2D,
  gl.TEXTURE_MIN_FILTER,
  gl.LINEAR_MIPMAP_NEAREST,
);
```

## See also

- `WebGLRenderingContext.getTexParameter()`
- `EXT_texture_filter_anisotropic`
