---
title: "GPURenderPassEncoder: executeBundles() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpurenderpassencoder/executebundles/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPURenderPassEncoder: executeBundles() method

The **`executeBundles()`** method of the
`GPURenderPassEncoder` interface executes commands previously recorded into the referenced `GPURenderBundle`s, as part of this render pass.

> **Note:**
> After calling `executeBundles()` the currently set vertex buffers, index buffers, bind groups, and pipeline are all cleared, even if no bundles are actually executed.

## Syntax

```js
executeBundles(bundles)
```

### Parameters

- `bundles`
    An array of `GPURenderBundle` objects, containing the pre-recorded commands to execute.

### Return value

None (`undefined`).

### Validation

The following criteria must be met when calling **`executeBundles()`**, otherwise a `GPUValidationError` is generated and the `GPURenderPassEncoder` becomes invalid.

For each `GPURenderBundle`:

- If the render pass's `depthReadOnly` property (as specified in the descriptor of the originating `GPUCommandEncoder.beginRenderPass()` call) is `true`, then the bundle's `depthReadOnly` property (as specified in the descriptor of the `GPUDevice.createRenderBundleEncoder()` call that created the originating `GPURenderBundleEncoder`) is also `true`.
- If the render pass's `stencilReadOnly` property (as specified in the descriptor of the originating `GPUCommandEncoder.beginRenderPass()` call) is `true`, then the bundle's `stencilReadOnly` property (as specified in the descriptor of the `GPUDevice.createRenderBundleEncoder()` call that created the originating `GPURenderBundleEncoder`) is also `true`.
- The layout of the render pipeline specified in `GPURenderPassEncoder.setPipeline()` (as defined in the descriptor of the originating `GPUDevice.createRenderPipeline()` call) equals the layout of the render bundle pipeline specified in `GPURenderBundleEncoder.setPipeline()`.

## Examples

In the WebGPU Samples Animometer example, a lot of like operations are done on many different objects simultaneously. `executeBundles()` is used to reuse the work on multiple render passes to improve performance. Study the example code listing for the full context.

```js
// …

return function doDraw(timestamp) {
  if (startTime === undefined) {
    startTime = timestamp;
  }
  uniformTime[0] = (timestamp - startTime) / 1000;
  device.queue.writeBuffer(uniformBuffer, timeOffset, uniformTime.buffer);

  renderPassDescriptor.colorAttachments[0].view = context
    .getCurrentTexture()
    .createView();

  const commandEncoder = device.createCommandEncoder();
  const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);

  if (settings.renderBundles) {
    passEncoder.executeBundles([renderBundle]);
  } else {
    recordRenderPass(passEncoder);
  }

  passEncoder.end();
  device.queue.submit([commandEncoder.finish()]);
};

// …
```

## See also

- The WebGPU API
