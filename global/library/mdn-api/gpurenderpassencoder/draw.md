---
title: "GPURenderPassEncoder: draw() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpurenderpassencoder/draw/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPURenderPassEncoder: draw() method

The **`draw()`** method of the
`GPURenderPassEncoder` interface draws primitives based on the vertex buffers provided by `setVertexBuffer()`.

## Syntax

```js
draw(vertexCount)
draw(vertexCount, instanceCount)
draw(vertexCount, instanceCount, firstVertex)
draw(vertexCount, instanceCount, firstVertex, firstInstance)
```

### Parameters

- `vertexCount`
    A number defining the number of vertices to draw.
- `instanceCount` (optional)
    A number defining the number of instances to draw. If omitted, `instanceCount` defaults to 1.
- `firstVertex` (optional)
    A number defining the offset into the vertex buffers, in vertices, to begin drawing from. If omitted, `firstVertex` defaults to 0.
- `firstInstance` (optional)
    A number defining the first instance to draw. If omitted, `firstInstance` defaults to 0.

### Return value

None (`undefined`).

## Examples

In our basic <example-value> demo, several commands are recorded via a `GPUCommandEncoder`. Most of these commands originate from the `GPURenderPassEncoder` created via `GPUCommandEncoder.beginRenderPass()`. `draw()` is used to specify that three vertices should be drawn to create our triangle.

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
