---
title: "WEBGL_debug_renderer_info extension"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webgl_debug_renderer_info/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WEBGL_debug_renderer_info extension

The **`WEBGL_debug_renderer_info`** extension is part of the WebGL API and exposes two constants with information about the graphics driver for debugging purposes.

Depending on the privacy settings of the browser, this extension might only be available to privileged contexts. Generally, the graphics driver information should only be used in edge cases to optimize your WebGL content or to debug GPU problems. The `WebGLRenderingContext.getParameter()` method can help you to detect which features are supported and the `failIfMajorPerformanceCaveat` context attribute lets you control if a context should be returned at all, if the performance would be dramatically slow.

WebGL extensions are available using the `WebGLRenderingContext.getExtension()` method.
For more information, see Using WebGL extensions.

> **Note:**
> Depending on the privacy settings of the browser, this extension might only be available to privileged contexts or not work at all. In Firefox, if `privacy.resistFingerprinting` is set to `true`, this extensions is disabled.
>
> This extension is available to both, `WebGL1` and `WebGL2` contexts.

## Constants

- ext.UNMASKED_VENDOR_WEBGL
    Vendor string of the graphics driver.
- ext.UNMASKED_RENDERER_WEBGL
    Renderer string of the graphics driver.

## Examples

With the help of this extension, privileged contexts are able to retrieve debugging information about the user's graphic driver:

```js
const canvas = document.getElementById("canvas");
const gl = canvas.getContext("webgl");

const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
const vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);

console.log(vendor);
console.log(renderer);
```

## See also

- `WebGLRenderingContext.getExtension()`
