---
title: "WebGLRenderingContext: generateMipmap() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webglrenderingcontext/generatemipmap/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGLRenderingContext: generateMipmap() method

The **`WebGLRenderingContext.generateMipmap()`** method of the
WebGL API generates a set of mipmaps for a
`WebGLTexture` object.

Mipmaps are used to create distance with objects. A higher-resolution mipmap is used
for objects that are closer, and a lower-resolution mipmap is used for objects that are
farther away. It starts with the resolution of the texture image and halves the
resolution until a 1x1 dimension texture image is created.

## Syntax

```js
generateMipmap(target)
```

### Parameters

- `target`
    A `GLenum` specifying the binding point (target) of the active texture
    whose mipmaps will be generated. Possible values:
    - `gl.TEXTURE_2D`: A two-dimensional texture.
    - `gl.TEXTURE_CUBE_MAP`: A cube-mapped texture.

    When using a `WebGL 2 context`,
    the following values are available additionally:
    - `gl.TEXTURE_3D`: A three-dimensional texture.
    - `gl.TEXTURE_2D_ARRAY`: A two-dimensional array texture.

### Return value

None (`undefined`).

## Examples

```js
gl.generateMipmap(gl.TEXTURE_2D);
```

## See also

- `WebGLRenderingContext.createTexture()`
- `WebGLRenderingContext.bindTexture()`
- `WebGLRenderingContext.getTexParameter()`
- `WebGLRenderingContext.texParameterf()`
- `WebGLRenderingContext.texParameteri()`
