---
title: "GPURenderPassEncoder: setStencilReference() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpurenderpassencoder/setstencilreference/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPURenderPassEncoder: setStencilReference() method

The **`setStencilReference()`** method of the
`GPURenderPassEncoder` interface sets the stencil reference value using during stencil tests with the `"replace"` stencil operation (as set in the descriptor of the `GPUDevice.createRenderPipeline()` method, in the properties defining the various stencil operations).

## Syntax

```js
setStencilReference(reference)
```

### Parameters

- `reference`
    A number representing the new stencil reference value to set for the render pass.

> **Note:**
> If a `setStencilReference()` call is not made, the stencil reference value defaults to 0 for each render pass.

### Return value

None (`undefined`).

## Examples

```js
// …

const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);

passEncoder.setPipeline(renderPipeline);
passEncoder.setVertexBuffer(0, vertexBuffer);
passEncoder.setStencilReference(1);
passEncoder.draw(3);

passEncoder.end();

// …
```

## See also

- The WebGPU API
