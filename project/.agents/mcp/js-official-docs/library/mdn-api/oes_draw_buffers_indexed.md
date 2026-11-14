---
title: "OES_draw_buffers_indexed"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/oes_draw_buffers_indexed/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# OES_draw_buffers_indexed

The **`OES_draw_buffers_indexed`** extension is part of the WebGL API and enables the use of different blend options when writing to multiple color buffers simultaneously.

WebGL extensions are available using the `WebGLRenderingContext.getExtension()` method.
For more information, see Using WebGL extensions.

> **Note:**
> This extension is only available to `WebGL2` contexts.

## Instance methods

- `OES_draw_buffers_indexed.blendEquationiOES()`
    Sets both the RGB and alpha blend equations for a particular draw buffer.
- `OES_draw_buffers_indexed.blendEquationSeparateiOES()`
    Sets the RGB and alpha blend equations separately for a particular draw buffer.
- `OES_draw_buffers_indexed.blendFunciOES()`
    Defines which function is used when blending pixels for a particular draw buffer.
- `OES_draw_buffers_indexed.blendFuncSeparateiOES()`
    Defines which function is used when blending pixels for RGB and alpha components separately for a particular draw buffer.
- `OES_draw_buffers_indexed.colorMaskiOES()`
    Sets which color components to enable or to disable when drawing or rendering for a particular draw buffer.
- `OES_draw_buffers_indexed.disableiOES()`
    Disables blending for a particular draw buffer.
- `OES_draw_buffers_indexed.enableiOES()`
    Enables blending for a particular draw buffer.

## Examples

### Using the `OES_draw_buffers_indexed` extension

Enable the extension with a call to `WebGLRenderingContext.getExtension()`.

```js
const ext = gl.getExtension("OES_draw_buffers_indexed");
```

You can now enable blending, set blending equation, blending function, and color mask for a particular draw buffer.

```js
// For gl.DRAW_BUFFER0
ext.enableiOES(gl.BLEND, 0);
ext.blendEquationiOES(0, gl.FUNC_ADD);
ext.blendFunciOES(0, gl.ONE, gl.ONE);
ext.colorMaskiOES(0, 1, 0, 0, 0);

// For gl.DRAW_BUFFER1
ext.enableiOES(gl.BLEND, 1);
ext.blendEquationSeparateiOES(1, gl.FUNC_ADD, gl.FUNC_SUBTRACT);
ext.blendFuncSeparateiOES(
  1,
  gl.SRC_ALPHA,
  gl.ONE_MINUS_SRC_ALPHA,
  gl.ZERO,
  gl.ZERO,
);
ext.colorMaskiOES(1, 0, 1, 0, 0);
```

To retrieve settings for a particular draw buffer, use `WebGL2RenderingContext.getIndexedParameter()`.

```js
// For gl.DRAW_BUFFER0
gl.getIndexedParameter(gl.BLEND_EQUATION_RGB, 0);
gl.getIndexedParameter(gl.BLEND_EQUATION_ALPHA, 0);
gl.getIndexedParameter(gl.BLEND_SRC_RGB, 0);
gl.getIndexedParameter(gl.BLEND_SRC_ALPHA, 0);
gl.getIndexedParameter(gl.BLEND_DST_RGB, 0);
gl.getIndexedParameter(gl.BLEND_DST_ALPHA, 0);
gl.getIndexedParameter(gl.COLOR_WRITEMASK, 0);

// For gl.DRAW_BUFFER1
gl.getIndexedParameter(gl.BLEND_EQUATION_RGB, 1);
gl.getIndexedParameter(gl.BLEND_EQUATION_ALPHA, 1);
gl.getIndexedParameter(gl.BLEND_SRC_RGB, 1);
gl.getIndexedParameter(gl.BLEND_SRC_ALPHA, 1);
gl.getIndexedParameter(gl.BLEND_DST_RGB, 1);
gl.getIndexedParameter(gl.BLEND_DST_ALPHA, 1);
gl.getIndexedParameter(gl.COLOR_WRITEMASK, 1);
```

You can use `WebGLRenderingContext.getParameter()` to see how many draw buffers are available.

```js
const maxDrawBuffers = gl.getParameter(gl.MAX_DRAW_BUFFERS);
```
