---
title: "WebGL2RenderingContext: texStorage3D() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webgl2renderingcontext/texstorage3d/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGL2RenderingContext: texStorage3D() method

The **`texStorage3D()`** method of the `WebGL2RenderingContext` of the WebGL API specifies all levels of three-dimensional texture storage.

## Syntax

```js
texStorage3D(target, levels, internalformat, width, height, depth)
```

### Parameters

- `target`
    A `GLenum` specifying the binding point (target) of the active texture. Possible values:
    - `gl.TEXTURE_3D`: A three-dimensional texture.
    - `gl.TEXTURE_2D_ARRAY`: A two-dimensional array texture.
- `levels`
    A `GLint` specifying the number of texture levels.
- `internalformat`
    A `GLenum` specifying the texture store format. For a list of possible values, see `WebGL2RenderingContext.texStorage2D()`.
- `width`
    A `GLsizei` specifying the width of the texture in texels.
- `height`
    A `GLsizei` specifying the height of the texture in texels.
- `depth`
    A `GLsizei` specifying the depth of the texture/the number of textures in a `TEXTURE_2D_ARRAY`.

### Return value

None (`undefined`).

## Examples

```js
gl.texStorage3D(gl.TEXTURE_3D, 1, gl.RGB8, 256, 256, 256);
```

## See also

- `WebGL2RenderingContext.texStorage2D()`
- `WEBGL_compressed_texture_etc`
