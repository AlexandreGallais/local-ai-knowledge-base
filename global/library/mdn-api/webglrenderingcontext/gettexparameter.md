---
title: "WebGLRenderingContext: getTexParameter() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webglrenderingcontext/gettexparameter/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGLRenderingContext: getTexParameter() method

The **`WebGLRenderingContext.getTexParameter()`** method of the
WebGL API returns information about the
given texture.

## Syntax

```js
getTexParameter(target, pname)
```

### Parameters

- `target`
    A `GLenum` specifying the binding point (target). Possible values:
    - `gl.TEXTURE_2D`: A two-dimensional texture.
    - `gl.TEXTURE_CUBE_MAP`: A cube-mapped texture.

    When using a `WebGL 2 context`,
    the following values are available additionally:
    - `gl.TEXTURE_3D`: A three-dimensional texture.
    - `gl.TEXTURE_2D_ARRAY`: A two-dimensional array texture.

- `pname`
    A `GLenum` specifying the information to query. Possible values:

           | pname
           | Return type
           | Description
           | Possible return values

           | Available in a WebGL 1 context

           | `gl.TEXTURE_MAG_FILTER`
           | `GLenum`
           | Texture magnification filter
           | `gl.LINEAR` (default value), `gl.NEAREST`.

           | `gl.TEXTURE_MIN_FILTER`
           | `GLenum`
           | Texture minification filter
           |
            `gl.LINEAR`, `gl.NEAREST`,
            `gl.NEAREST_MIPMAP_NEAREST`,
            `gl.LINEAR_MIPMAP_NEAREST`,
            `gl.NEAREST_MIPMAP_LINEAR` (default value),
            `gl.LINEAR_MIPMAP_LINEAR`.

           | `gl.TEXTURE_WRAP_S`
           | `GLenum`
           | Wrapping function for texture coordinate `s`
           |
            `gl.REPEAT` (default value), `gl.CLAMP_TO_EDGE`,
            `gl.MIRRORED_REPEAT`.

           | `gl.TEXTURE_WRAP_T`
           | `GLenum`
           | Wrapping function for texture coordinate `t`
           |
            `gl.REPEAT` (default value), `gl.CLAMP_TO_EDGE`,
            `gl.MIRRORED_REPEAT`.

           |
            Additionally available when using the
            `EXT_texture_filter_anisotropic` extension

           | `ext.TEXTURE_MAX_ANISOTROPY_EXT`
           | `GLfloat`
           | Maximum anisotropy for a texture
           | Any float values.

           | Additionally available when using a WebGL 2 context

           | `gl.TEXTURE_BASE_LEVEL`
           | `GLint`
           | Texture mipmap level
           | Any int values.

           | `gl.TEXTURE_COMPARE_FUNC`
           | `GLenum`
           | Comparison function
           |
            `gl.LEQUAL` (default value), `gl.GEQUAL`,
            `gl.LESS`, `gl.GREATER`, `gl.EQUAL`,
            `gl.NOTEQUAL`, `gl.ALWAYS`, `gl.NEVER`.

           | `gl.TEXTURE_COMPARE_MODE`
           | `GLenum`
           | Texture comparison mode
           |
            `gl.NONE` (default value),
            `gl.COMPARE_REF_TO_TEXTURE`.

           | `gl.TEXTURE_IMMUTABLE_FORMAT`
           | `GLboolean`
           | Immutability of the texture format and size
           | true or false.

           | `gl.TEXTURE_IMMUTABLE_LEVELS`
           | `GLuint`
           | ?
           | Any uint values.

           | `gl.TEXTURE_MAX_LEVEL`
           | `GLint`
           | Maximum texture mipmap array level
           | Any int values.

           | `gl.TEXTURE_MAX_LOD`
           | `GLfloat`
           | Texture maximum level-of-detail value
           | Any float values.

           | `gl.TEXTURE_MIN_LOD`
           | `GLfloat`
           | Texture minimum level-of-detail value
           | Any float values.

           | `gl.TEXTURE_WRAP_R`
           | `GLenum`
           | Wrapping function for texture coordinate `r`
           |
            `gl.REPEAT` (default value), `gl.CLAMP_TO_EDGE`,
            `gl.MIRRORED_REPEAT`.

### Return value

Returns the requested texture information (as specified with `pname`). If an
error occurs, `null` is returned.

## Examples

```js
gl.getTexParameter(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER);
```

## See also

- `WebGLRenderingContext.texParameterf()`
- `WebGLRenderingContext.texParameteri()`
- `EXT_texture_filter_anisotropic`
