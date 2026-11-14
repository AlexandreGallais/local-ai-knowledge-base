---
title: "WEBGL_debug_shaders extension"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webgl_debug_shaders/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WEBGL_debug_shaders extension

The **`WEBGL_debug_shaders`** extension is part of the WebGL API and exposes a method to debug shaders from privileged contexts.

This extension is not directly available to websites as the way of how the shader is translated may uncover personally-identifiable information to the web page about the kind of graphics card in the user's computer.

WebGL extensions are available using the `WebGLRenderingContext.getExtension()` method.
For more information, see Using WebGL extensions.

> **Note:**
> Depending on the privacy settings of the browser, this extension might only be available to privileged contexts.
>
> This extension is available to both, `WebGL1` and `WebGL2` contexts.

## Instance methods

- `WEBGL_debug_shaders.getTranslatedShaderSource()`
    Returns the translated shader source.

## See also

- `WebGLRenderingContext.getExtension()`
