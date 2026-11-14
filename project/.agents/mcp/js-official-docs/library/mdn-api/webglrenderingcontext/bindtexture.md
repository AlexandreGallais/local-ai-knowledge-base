---
title: "WebGLRenderingContext: bindTexture() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webglrenderingcontext/bindtexture/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGLRenderingContext: bindTexture() method

The **`WebGLRenderingContext.bindTexture()`** method of the WebGL API binds a given
`WebGLTexture` to a target (binding point).

## Syntax

```js
bindTexture(target, texture)
```

### Parameters

- `target`
    A `GLenum` specifying the binding point (target). Possible values:
    - `gl.TEXTURE_2D`
        A two-dimensional texture.
    - `gl.TEXTURE_CUBE_MAP`
        A cube-mapped texture.

    When using a `WebGL 2 context`, the following values are available additionally:
    - `gl.TEXTURE_3D`
        A three-dimensional texture.
    - `gl.TEXTURE_2D_ARRAY`
        A two-dimensional array texture.

- `texture`
    A `WebGLTexture` object to bind.
    If `null` is passed, the currently bound texture for the specified target is unbound.

### Return value

None (`undefined`).

### Exceptions

A `gl.INVALID_ENUM` error is thrown if `target` is not
`gl.TEXTURE_2D`, `gl.TEXTURE_CUBE_MAP`,
`gl.TEXTURE_3D`, or `gl.TEXTURE_2D_ARRAY`.

## Examples

### Binding a texture

```js
const canvas = document.getElementById("canvas");
const gl = canvas.getContext("webgl");
const texture = gl.createTexture();

gl.bindTexture(gl.TEXTURE_2D, texture);
```

### Unbinding a texture

```js
// Unbind any texture currently bound to TEXTURE_2D
gl.bindTexture(gl.TEXTURE_2D, null);
```

### Getting current bindings

To check the current texture binding, query the `gl.TEXTURE_BINDING_2D` or
`gl.TEXTURE_BINDING_CUBE_MAP` constants.

```js
gl.getParameter(gl.TEXTURE_BINDING_2D);
```

## See also

- `WebGLRenderingContext.createTexture()`
- `WebGLRenderingContext.deleteTexture()`
- `WebGLRenderingContext.isTexture()`
- `WebGLRenderingContext.texImage2D()`
