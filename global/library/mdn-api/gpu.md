---
title: "GPU"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpu/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPU

The **`GPU`** interface of the `WebGPU API` is the starting point for using WebGPU. It can be used to return a `GPUAdapter` from which you can request devices, configure features and limits, and more.

The `GPU` object for the current context is accessed via the `Navigator.gpu` or `WorkerNavigator.gpu` properties.

## Instance properties

- `wgslLanguageFeatures` (read-only)
    A `WGSLLanguageFeatures` object that reports the WGSL language extensions supported by the WebGPU implementation.

## Instance methods

- `requestAdapter()`
    Returns a `Promise` that fulfills with a `GPUAdapter` object instance. From this you can request a `GPUDevice`, which is the primary interface for using WebGPU functionality.
- `getPreferredCanvasFormat()`
    Returns the optimal canvas texture format for displaying 8-bit depth, standard dynamic range content on the current system.

## Examples

### Requesting an adapter and a device

```js
async function init() {
  if (!navigator.gpu) {
    throw Error("WebGPU not supported.");
  }

  const adapter = await navigator.gpu.requestAdapter();
  if (!adapter) {
    throw Error("Couldn't request WebGPU adapter.");
  }

  const device = await adapter.requestDevice();

  // …
}
```

### Configuring a GPUCanvasContext with the optimal texture format

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
