---
title: "WebGLRenderingContext: getRenderbufferParameter() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webglrenderingcontext/getrenderbufferparameter/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGLRenderingContext: getRenderbufferParameter() method

The **`WebGLRenderingContext.getRenderbufferParameter()`**
method of the WebGL API returns information
about the renderbuffer.

## Syntax

```js
getRenderbufferParameter(target, pname)
```

### Parameters

- `target`
    A `GLenum` specifying the target renderbuffer object. Possible values:
    - `gl.RENDERBUFFER`
        Buffer data storage for single images in a
        renderable internal format.

- `pname`
    A `GLenum` specifying the information to query. Possible values:
    - `gl.RENDERBUFFER_WIDTH`
        Returns a `GLint` indicating
        the width of the image of the currently bound renderbuffer.
    - `gl.RENDERBUFFER_HEIGHT`
        Returns a `GLint` indicating
        the height of the image of the currently bound renderbuffer.
    - `gl.RENDERBUFFER_INTERNAL_FORMAT`
        Returns a `GLenum`
        indicating the internal format of the currently bound renderbuffer. The default is
        `gl.RGBA4`. Possible return values:
        - `gl.RGBA4`: 4 red bits, 4 green bits, 4 blue bits 4 alpha bits.
        - `gl.RGB565`: 5 red bits, 6 green bits, 5 blue bits.
        - `gl.RGB5_A1`: 5 red bits, 5 green bits, 5 blue bits, 1 alpha bit.
        - `gl.DEPTH_COMPONENT16`: 16 depth bits.
        - `gl.STENCIL_INDEX8`: 8 stencil bits.

    - `gl.RENDERBUFFER_GREEN_SIZE`
        Returns a `GLint` that is
        the resolution size (in bits) for the green color.
    - `gl.RENDERBUFFER_BLUE_SIZE`
        Returns a `GLint` that is
        the resolution size (in bits) for the blue color.
    - `gl.RENDERBUFFER_RED_SIZE`
        Returns a `GLint` that is
        the resolution size (in bits) for the red color.
    - `gl.RENDERBUFFER_ALPHA_SIZE`
        Returns a `GLint` that is
        the resolution size (in bits) for the alpha component.
    - `gl.RENDERBUFFER_DEPTH_SIZE`
        Returns a `GLint` that is
        the resolution size (in bits) for the depth component.
    - `gl.RENDERBUFFER_STENCIL_SIZE`
        Returns a `GLint` that
        is the resolution size (in bits) for the stencil component.

    When using a `WebGL 2 context`,
    the following value is available additionally:
    - `gl.RENDERBUFFER_SAMPLES`
        Returns a `GLint`
        indicating the number of samples of the image of the currently bound
        renderbuffer.

### Return value

Depends on the requested information (as specified with `pname`). Either a
`GLint` or a `GLenum`.

## Examples

```js
gl.getRenderbufferParameter(gl.RENDERBUFFER, gl.RENDERBUFFER_WIDTH);
```

## See also

- `WebGLRenderingContext.bindRenderbuffer()`
- `WebGLRenderingContext.createRenderbuffer()`
- `WebGLRenderingContext.deleteRenderbuffer()`
- `WebGLRenderingContext.renderbufferStorage()`
- Other buffers: `WebGLBuffer`, `WebGLFramebuffer`
