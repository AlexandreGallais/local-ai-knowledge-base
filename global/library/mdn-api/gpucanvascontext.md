---
title: "GPUCanvasContext"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpucanvascontext/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPUCanvasContext

The **`GPUCanvasContext`** interface of the `WebGPU API` represents the WebGPU rendering context of a `<canvas>` element, returned via an `HTMLCanvasElement.getContext()` call with a `contextType` of `"webgpu"`.

## Instance properties

- `canvas` (read-only)
    Returns a reference to the canvas that the context was created from.

## Instance methods

- `configure()`
    Configures the context to use for rendering with a given `GPUDevice` and clears the canvas to transparent black.
- `getConfiguration()`
    Returns the current configuration set for the context.
- `getCurrentTexture()`
    Returns the next `GPUTexture` to be composited to the document by the canvas context.
- `unconfigure()`
    Removes any previously-set context configuration, and destroys any textures produced while the canvas context was configured.

## Examples

```js
const canvas = document.querySelector("#gpuCanvas");
const context = canvas.getContext("webgpu");

context.configure({
  device,
  format: navigator.gpu.getPreferredCanvasFormat(),
  alphaMode: "premultiplied",
});
```

## See also

- The WebGPU API
