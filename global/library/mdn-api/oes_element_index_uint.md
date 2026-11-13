---
title: "OES_element_index_uint extension"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/oes_element_index_uint/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# OES_element_index_uint extension

The **`OES_element_index_uint`** extension is part of the WebGL API and adds support for `gl.UNSIGNED_INT` types to `WebGLRenderingContext.drawElements()`.

WebGL extensions are available using the `WebGLRenderingContext.getExtension()` method.
For more information, see Using WebGL extensions.

> **Note:**
> This extension is only available to `WebGL1` contexts. In `WebGL2`, the functionality of this extension is available on the WebGL2 context by default.

## Extended methods

This extension extends `WebGLRenderingContext.drawElements()`:

- The `type` parameter now accepts `gl.UNSIGNED_INT`.

## Examples

```js
const ext = gl.getExtension("OES_element_index_uint");

gl.drawElements(gl.POINTS, 8, gl.UNSIGNED_INT, 0);
```

## See also

- `WebGLRenderingContext.getExtension()`
- `WebGLRenderingContext.drawElements()`
