---
title: "WebGLRenderingContext: getSupportedExtensions() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webglrenderingcontext/getsupportedextensions/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGLRenderingContext: getSupportedExtensions() method

The **`WebGLRenderingContext.getSupportedExtensions()`** method
returns a list of all the supported WebGL
extensions.

## Syntax

```js
getSupportedExtensions()
```

### Parameters

None.

### Return value

An `Array` of strings with all the supported WebGL extensions.

## Examples

```js
const canvas = document.getElementById("canvas");
gl = canvas.getContext("webgl");

const extensions = gl.getSupportedExtensions();
// Array [ 'ANGLE_instanced_arrays', 'EXT_blend_minmax', … ]
```

See also the `WebGLRenderingContext.getExtension()` method to get a
specific extension object.

## WebGL extensions

Extensions for the WebGL API are registered in the WebGL Extension Registry. They are also listed in our WebGL API reference.

## See also

- `WebGLRenderingContext.getExtension()`
- webglreport.com
