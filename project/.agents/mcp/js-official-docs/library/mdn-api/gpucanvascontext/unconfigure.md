---
title: "GPUCanvasContext: unconfigure() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpucanvascontext/unconfigure/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPUCanvasContext: unconfigure() method

The **`unconfigure()`** method of the
`GPUCanvasContext` interface removes any previously-set context configuration, and destroys any textures returned via `getCurrentTexture()` while the canvas context was configured.

## Syntax

```js
unconfigure()
```

### Parameters

None.

### Return value

None (`undefined`).

## Examples

```js
const canvas = document.querySelector("#gpuCanvas");
const context = canvas.getContext("webgpu");

context.configure({
  device,
  format: navigator.gpu.getPreferredCanvasFormat(),
  alphaMode: "premultiplied",
});

// Later on
context.unconfigure();
```

## See also

- The WebGPU API
