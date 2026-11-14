---
title: "WebGL constants (part 1 of 9)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webgl_api/constants/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGL constants

The WebGL API provides several constants that are passed into or returned by functions. All constants are of type `GLenum`.

Standard WebGL constants are installed on the `WebGLRenderingContext` and `WebGL2RenderingContext` objects, so that you use them as `gl.CONSTANT_NAME`:

```js
const canvas = document.getElementById("myCanvas");
const gl = canvas.getContext("webgl");

gl.getParameter(gl.LINE_WIDTH);
```

Some constants are also provided by WebGL extensions. A list is provided below.

```js
const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
const vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
```

The WebGL tutorial has more information, examples, and resources on how to get started with WebGL.

## Table of contents

- Standard WebGL 1 constants
- Standard WebGL 2 constants
- WebGL extension constants
