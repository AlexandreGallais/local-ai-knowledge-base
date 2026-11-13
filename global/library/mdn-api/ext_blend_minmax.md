---
title: "EXT_blend_minmax extension"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/ext_blend_minmax/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# EXT_blend_minmax extension

The **`EXT_blend_minmax`** extension is part of the WebGL API and extends blending capabilities by adding two new blend equations: the minimum or maximum color components of the source and destination colors.

WebGL extensions are available using the `WebGLRenderingContext.getExtension()` method.
For more information, see Using WebGL extensions.

> **Note:**
> This extension is only available to `WebGL1` contexts. In `WebGL2`, the functionality of this extension is available on the WebGL2 context by default. The constants in WebGL2 are `gl.MIN` and `gl.MAX`.

## Constants

This extension adds two new constants, which can be used in `WebGLRenderingContext.blendEquation()` and `WebGLRenderingContext.blendEquationSeparate()`:

- `ext.MIN_EXT`
    Produces the minimum color components of the source and destination colors.
- `ext.MAX_EXT`
    Produces the maximum color components of the source and destination colors.

## Examples

```js
const ext = gl.getExtension("EXT_blend_minmax");

gl.blendEquation(ext.MIN_EXT);
gl.blendEquation(ext.MAX_EXT);

gl.blendEquationSeparate(ext.MIN_EXT, ext.MAX_EXT);
```

## See also

- `WebGLRenderingContext.getExtension()`
- `WebGLRenderingContext.blendEquation()`
- `WebGLRenderingContext.blendEquationSeparate()`
