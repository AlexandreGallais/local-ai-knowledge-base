---
title: "GPUCanvasContext: getConfiguration() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpucanvascontext/getconfiguration/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPUCanvasContext: getConfiguration() method

The **`getConfiguration()`** method of the
`GPUCanvasContext` interface returns the current configuration set for the context.

## Syntax

```js
getConfiguration()
```

### Parameters

None.

### Return value

An object containing the configuration options set on the context (i.e., via the `GPUCanvasContext.configure()` method), or `null` if no configuration is set (either no configuration was previously set, or a configuration was set and then `GPUCanvasContext.unconfigure()` was called on the context).

## Examples

```js
const canvas = document.querySelector("canvas");
const context = canvas.getContext("webgpu");

if (!navigator.gpu) {
  throw Error("WebGPU not supported.");
}

const adapter = await navigator.gpu.requestAdapter();
if (!adapter) {
  throw Error("Couldn't request WebGPU adapter.");
}

const device = await adapter.requestDevice();

context.configure({
  device,
  format: navigator.gpu.getPreferredCanvasFormat(),
  alphaMode: "premultiplied",
});

console.log(context.getConfiguration());
/* Logs something like:

{
  "alphaMode": "premultiplied",
  "colorSpace": "srgb",
  "device": { ... },
  "format": "bgra8unorm",
  "toneMapping": {
      "mode": "standard"
  },
  "usage": 16,
  "viewFormats": []
}
*/
```

## See also

- `GPUCanvasContext.configure()`
- The WebGPU API
