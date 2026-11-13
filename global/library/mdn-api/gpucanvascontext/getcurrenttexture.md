---
title: "GPUCanvasContext: getCurrentTexture() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpucanvascontext/getcurrenttexture/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPUCanvasContext: getCurrentTexture() method

The **`getCurrentTexture()`** method of the
`GPUCanvasContext` interface returns the next `GPUTexture` to be composited to the document by the canvas context.

## Syntax

```js
getCurrentTexture()
```

### Parameters

None.

### Return value

A `GPUTexture` object instance.

### Exceptions

- `InvalidStateError` `DOMException`
    Thrown if `getCurrentTexture()` is called on the canvas context before it is configured (i.e., before `GPUCanvasContext.configure()` has been called).

## Examples

```js
const canvas = document.querySelector("#gpuCanvas");
const context = canvas.getContext("webgpu");

context.configure({
  device,
  format: navigator.gpu.getPreferredCanvasFormat(),
  alphaMode: "premultiplied",
});

// …
// Later on
const commandEncoder = device.createCommandEncoder();

const renderPassDescriptor = {
  colorAttachments: [
    {
      clearValue: [0, 0, 0, 1], // Opaque black
      loadOp: "clear",
      storeOp: "store",
      view: context.getCurrentTexture().createView(),
    },
  ],
};

const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);
```

## See also

- The WebGPU API
