---
title: "GPURenderPassEncoder: end() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpurenderpassencoder/end/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPURenderPassEncoder: end() method

The **`end()`** method of the
`GPURenderPassEncoder` interface completes recording of the current render pass <example-value> sequence.

## Syntax

```js
end()
```

### Parameters

None.

### Return value

None (`undefined`).

### Validation

The following criteria must be met when calling **`end()`**, otherwise a `GPUValidationError` is generated and the `GPURenderPassEncoder` becomes invalid:

- The `GPURenderPassEncoder` is open (i.e., not already ended via an `end()` call).
- There is no occlusion query (i.e., started via `beginOcclusionQuery()`) active on the current render pass.
- The debug stack for the current render pass is empty (i.e., no render pass debug group is currently open, as opened by `pushDebugGroup()`).
- The number of draw commands encoded in this render pass is less than or equal to the `maxDrawCount` property set in the `GPUCommandEncoder.beginRenderPass()` descriptor.

## Examples

In our basic <example-value> demo, several commands are recorded via a `GPUCommandEncoder`. Most of these commands originate from the `GPURenderPassEncoder` created via `GPUCommandEncoder.beginRenderPass()`. `end()` is called in an appropriate place to end the render pass.

```js
// …

const renderPipeline = device.createRenderPipeline(pipelineDescriptor);

// Create GPUCommandEncoder to issue commands to the GPU
// Note: render pass <example-value>, command encoder, etc. are destroyed after use, fresh one needed for each frame.
const commandEncoder = device.createCommandEncoder();

// Create GPURenderPassDescriptor to tell WebGPU which texture to draw into, then initiate render pass
const renderPassDescriptor = {
  colorAttachments: [
    {
      clearValue: clearColor,
      loadOp: "clear",
      storeOp: "store",
      view: context.getCurrentTexture().createView(),
    },
  ],
};

const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);

// Draw the triangle
passEncoder.setPipeline(renderPipeline);
passEncoder.setVertexBuffer(0, vertexBuffer);
passEncoder.draw(3);

// End the render pass
passEncoder.end();

// End frame by passing array of command buffers to command queue for execution
device.queue.submit([commandEncoder.finish()]);

// …
```

## See also

- The WebGPU API
