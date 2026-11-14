---
title: "EXT_texture_norm16 extension"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/ext_texture_norm16/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# EXT_texture_norm16 extension

The **`EXT_texture_norm16`** extension is part of the WebGL API and provides a set of new 16-bit signed normalized and unsigned normalized formats (fixed-point texture, renderbuffer and texture buffer).

When this extension is enabled:

- The `WebGLRenderingContext.texImage2D()` and `WebGLRenderingContext.texSubImage2D()` methods accept new formats provided by this extension.
- The 16-bit normalized fixed-point types `ext.R16_EXT`, `ext.RG16_EXT` and `ext.RGBA16_EXT` become available as color-renderable formats and renderbuffers and be created in these formats.

WebGL extensions are available using the `WebGLRenderingContext.getExtension()` method.
For more information, see Using WebGL extensions.

> **Note:**
> This extension is only available to `WebGL 2` contexts.

## Constants

- `ext.R16_EXT`
    Red 16-bit unsigned format. Color-renderable.
- `ext.RG16_EXT`
    RG 16-bit unsigned format. Color-renderable.
- `ext.RGB16_EXT`
    RGB 16-bit unsigned format.
- `ext.RGBA16_EXT`
    RGBA 16-bit unsigned format. Color-renderable.
- `ext.R16_SNORM_EXT`
    Red 16-bit signed normalized format.
- `ext.RG16_SNORM_EXT`
    RG 16-bit signed normalized format.
- `ext.RGB16_SNORM_EXT`
    RGB 16-bit signed normalized format.
- `ext.RGBA16_SNORM_EXT`
    RGBA 16-bit signed normalized format.

## Examples

### Enabling the extension

```js
let ext = gl.getExtension("EXT_texture_norm16");
```

### Texture formats

The `WebGLRenderingContext.texImage2D()` method accepts new formats when `EXT_texture_norm16` is enabled. Example calls:

```js
// imageData = Uint16Array
gl.texImage2D(gl.TEXTURE_2D, 0, ext.R16_EXT, 1, 1, 0, gl.RED, gl.UNSIGNED_SHORT, imageData);
gl.texImage2D(gl.TEXTURE_2D, 0, ext.RG16_EXT, 1, 1, 0, gl.RG, gl.UNSIGNED_SHORT, imageData);
gl.texImage2D(gl.TEXTURE_2D, 0, ext.RGB16_EXT, 1, 1, 0, gl.RGB, gl.UNSIGNED_SHORT, imageData);
gl.texImage2D(gl.TEXTURE_2D, 0, ext.RGBA16_EXT, 1, 1, 0, gl.RGBA, gl.UNSIGNED_SHORT, imageData);

// imageData = Int16Array
gl.texImage2D(gl.TEXTURE_2D, 0, ext.R16_SNORM_EXT, 1, 1, 0, gl.RED, gl.SHORT, imageData);
gl.texImage2D(gl.TEXTURE_2D, 0, ext.RG16_SNORM_EXT, 1, 1, 0, gl.RG, gl.SHORT, imageData);
gl.texImage2D(gl.TEXTURE_2D, 0, ext.RGB16_SNORM_EXT, 1, 1, 0, gl.RGB, gl.SHORT, imageData);
gl.texImage2D(gl.TEXTURE_2D, 0, ext.RGBA16_SNORM_EXT, 1, 1, 0, gl.RGBA, gl.SHORT, imageData);
```

### Renderbuffer formats

The `WebGLRenderingContext.renderbufferStorage()` method accepts `ext.R16_EXT`,
`ext.RG16_EXT` and `ext.RGBA16_EXT` as internal formats to create renderbuffers in these formats. Example calls:

```js
gl.renderbufferStorage(gl.RENDERBUFFER, ext.R16_EXT, 1, 1);
gl.renderbufferStorage(gl.RENDERBUFFER, ext.RG16_EXT, 1, 1);
gl.renderbufferStorage(gl.RENDERBUFFER, ext.RGBA16_EXT, 1, 1);
```

## See also

- `WebGLRenderingContext.getExtension()`
- `WebGLRenderingContext.texImage2D()`
- `WebGLRenderingContext.renderbufferStorage()`
