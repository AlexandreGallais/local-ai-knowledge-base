---
title: "WebGLRenderingContext: deleteShader() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webglrenderingcontext/deleteshader/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGLRenderingContext: deleteShader() method

The **`WebGLRenderingContext.deleteShader()`** method of the WebGL API marks a given
`WebGLShader` object for deletion. It will then be deleted whenever the
shader is no longer in use. This method has no effect if the shader has already been
deleted, and the `WebGLShader` is automatically marked for deletion when it
is destroyed by the garbage collector.

## Syntax

```js
deleteShader(shader)
```

### Parameters

- `shader`
    A `WebGLShader` object to delete.

### Return value

None (`undefined`).

## Examples

### Deleting a shader

```js
gl.deleteShader(shader);
```

## See also

- `WebGLRenderingContext.createShader()`
- `WebGLRenderingContext.isShader()`
- `WebGLRenderingContext.getAttachedShaders()`
