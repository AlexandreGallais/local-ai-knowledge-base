---
title: "GPURenderPassEncoder: setPipeline() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpurenderpassencoder/setpipeline/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPURenderPassEncoder: setPipeline() method

The **`setPipeline()`** method of the
`GPURenderPassEncoder` interface sets the `GPURenderPipeline` to use for subsequent render pass commands.

## Syntax

```js
setPipeline(pipeline)
```

### Parameters

- `pipeline`
    The `GPURenderPipeline` to use for subsequent render pass commands.

### Return value

None (`undefined`).

### Validation

The following criteria must be met when calling **`setPipeline()`**, otherwise a `GPUValidationError` is generated and the `GPURenderPassEncoder` becomes invalid:

- If the `GPURenderPipeline` writes to the depth component of the depth/stencil attachment, `depthReadOnly` (as specified in the descriptor of the originating `GPUCommandEncoder.beginRenderPass()` call) is `true`.
- If the `GPURenderPipeline` writes to the stencil component of the depth/stencil attachment, `stencilReadOnly` (as specified in the descriptor of the originating `GPUCommandEncoder.beginRenderPass()` call) is `true`.

## Examples

In our basic <example-value> demo, several commands are recorded via a `GPUCommandEncoder`. Most of these commands originate from the `GPURenderPassEncoder` created via `GPUCommandEncoder.beginRenderPass()`. `setPipeline()` is called in an appropriate place to set the render pipeline.

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
