---
title: "WebGLRenderingContext: deleteTexture() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webglrenderingcontext/deletetexture/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGLRenderingContext: deleteTexture() method

The **`WebGLRenderingContext.deleteTexture()`** method of the
WebGL API deletes a given
`WebGLTexture` object. This method has no effect if the texture has already
been deleted.

## Syntax

```js
deleteTexture(texture)
```

### Parameters

- `texture`
    A `WebGLTexture` object to delete.

### Return value

None (`undefined`).

## Examples

### Deleting a texture

```js
const canvas = document.getElementById("canvas");
const gl = canvas.getContext("webgl");
const texture = gl.createTexture();

// …

gl.deleteTexture(texture);
```

## See also

- `WebGLRenderingContext.bindTexture()`
- `WebGLRenderingContext.createTexture()`
- `WebGLRenderingContext.isTexture()`
- `WebGLRenderingContext.texImage2D()`
