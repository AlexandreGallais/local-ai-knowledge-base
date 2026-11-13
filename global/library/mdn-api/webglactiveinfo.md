---
title: "WebGLActiveInfo"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webglactiveinfo/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGLActiveInfo

The **`WebGLActiveInfo`** interface is part of the WebGL API and represents the information returned by calling the `WebGLRenderingContext.getActiveAttrib()` and `WebGLRenderingContext.getActiveUniform()` methods.

## Instance properties

- `WebGLActiveInfo.name` (read-only)
    The name of the requested variable.
- `WebGLActiveInfo.size` (read-only)
    The size of the requested variable.
- `WebGLActiveInfo.type` (read-only)
    The type of the requested variable.

## Examples

A `WebGLActiveInfo` object is returned by:

- `WebGLRenderingContext.getActiveAttrib()`
- `WebGLRenderingContext.getActiveUniform()` or
- `WebGL2RenderingContext.getTransformFeedbackVarying()`

## See also

- `WebGLRenderingContext.getActiveAttrib()`
- `WebGLRenderingContext.getActiveUniform()`
