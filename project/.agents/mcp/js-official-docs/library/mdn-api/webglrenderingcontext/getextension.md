---
title: "WebGLRenderingContext: getExtension() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webglrenderingcontext/getextension/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGLRenderingContext: getExtension() method

The **`WebGLRenderingContext.getExtension()`** method enables a
WebGL extension.

## Syntax

```js
getExtension(name)
```

### Parameters

- `name`
    A `String` for the name of the WebGL extension to enable.

### Return value

A WebGL extension object, or `null` if name does not match
(case-insensitive) to one of the strings in
`WebGLRenderingContext.getSupportedExtensions`.

## Examples

Once a WebGL extension is enabled, you are able to use the methods, properties or
constants that this extension object provides.

```js
const canvas = document.getElementById("canvas");
gl = canvas.getContext("webgl");

gl.getExtension("WEBGL_lose_context").loseContext();
```

## WebGL extensions

Extensions for the WebGL API are registered in the WebGL Extension Registry. They are also listed in our WebGL API reference.

## See also

- `WebGLRenderingContext.getSupportedExtensions()`
- webglreport.com
