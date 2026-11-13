---
title: "WebGL2RenderingContext: getInternalformatParameter() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webgl2renderingcontext/getinternalformatparameter/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGL2RenderingContext: getInternalformatParameter() method

The **`WebGL2RenderingContext.getInternalformatParameter()`**
method of the WebGL 2 API returns
information about implementation-dependent support for internal formats.

## Syntax

```js
getInternalformatParameter(target, internalformat, pname)
```

### Parameters

- `target`
    A `GLenum` specifying the target renderbuffer object. Possible values:
    - `gl.RENDERBUFFER`
        Buffer data storage for single images in a
        renderable internal format.

- `internalformat`
    A `GLenum` specifying the internal format about which to retrieve
    information (must be a color-renderable, depth-renderable or stencil-renderable
    format).
- `pname`
    A `GLenum` specifying the type of information to query. Possible
    values:
    - `gl.SAMPLES`
        Returns an `Int32Array` containing sample
        counts supported for `internalformat` in descending order.

### Return value

Depends on the requested information (as specified with `pname`). It is an
`Int32Array` if `pname` is `gl.SAMPLES`.

## Examples

```js
const samples = gl.getInternalformatParameter(
  gl.RENDERBUFFER,
  gl.RGBA8,
  gl.SAMPLES,
);
```

## See also

- `WebGLRenderingContext.getRenderbufferParameter()`
