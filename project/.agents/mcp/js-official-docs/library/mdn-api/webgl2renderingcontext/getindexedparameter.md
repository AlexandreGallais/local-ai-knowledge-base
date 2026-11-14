---
title: "WebGL2RenderingContext: getIndexedParameter() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webgl2renderingcontext/getindexedparameter/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGL2RenderingContext: getIndexedParameter() method

The **`WebGL2RenderingContext.getIndexedParameter()`** method
of the WebGL 2 API returns indexed
information about a given `target`.

## Syntax

```js
getIndexedParameter(target, index)
```

### Parameters

- `target`
    A `GLenum` specifying the target for which to return information.
    Possible values:
    - `gl.TRANSFORM_FEEDBACK_BUFFER_BINDING`: Returns a
      `WebGLBuffer`.
    - `gl.TRANSFORM_FEEDBACK_BUFFER_SIZE`: Returns a
      `GLsizeiptr`.
    - `gl.TRANSFORM_FEEDBACK_BUFFER_START`: Returns a
      `GLintptr`.
    - `gl.UNIFORM_BUFFER_BINDING`: Returns a `WebGLBuffer`.
    - `gl.UNIFORM_BUFFER_SIZE`: Returns a `GLsizeiptr`.
    - `gl.UNIFORM_BUFFER_START`: Returns a `GLintptr`.

    When using the `OES_draw_buffers_indexed` WebGL 2 extension, the following values are available additionally:
    - `gl.BLEND_EQUATION_RGB`: Returns the RGB blend equation for the draw buffer at `index`.
    - `gl.BLEND_EQUATION_ALPHA`: Returns the alpha blend equation for the draw buffer at `index`.
    - `gl.BLEND_SRC_RGB`: Returns the source RGB blend function for the draw buffer at `index`.
    - `gl.BLEND_SRC_ALPHA`: Returns the source alpha blend function for the draw buffer at `index`.
    - `gl.BLEND_DST_RGB`: Returns the destination RGB blend function for the draw buffer at `index`.
    - `gl.BLEND_DST_ALPHA`: Returns the destination alpha blend function for the draw buffer at `index`.
    - `gl.COLOR_WRITEMASK`: Returns an array containing color components are enabled for the draw buffer at `index`.

- `index`
    A `GLuint` specifying the index of the `target` that is
    queried.

### Return value

Depends on the requested information (as specified with `target`).

## Examples

```js
const binding = gl.getIndexedParameter(gl.TRANSFORM_FEEDBACK_BUFFER_BINDING, 0);
```

## See also

- `WebGLRenderingContext.getParameter()`
