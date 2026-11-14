---
title: "GPURenderPassEncoder"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpurenderpassencoder/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPURenderPassEncoder

The **`GPURenderPassEncoder`** interface of the `WebGPU API` encodes commands related to controlling the vertex and fragment shader stages, as issued by a `GPURenderPipeline`. It forms part of the overall encoding activity of a `GPUCommandEncoder`.

A render pipeline renders graphics to `GPUTexture` attachments, typically intended for display in a `<canvas>` element, but it could also render to textures used for other purposes that never appear onscreen. It has two main stages:

- A vertex stage, in which a vertex shader takes positioning data fed into the GPU and uses it to position a series of vertices in 3D space by applying specified effects like rotation, translation, or perspective. The vertices are then assembled into primitives such as triangles (the basic <example-value> block of rendered graphics) and rasterized by the GPU to figure out what pixels each one should cover on the drawing canvas.

- A fragment stage, in which a fragment shader computes the color for each pixel covered by the primitives produced by the vertex shader. These computations frequently use inputs such as images (in the form of textures) that provide surface details and the position and color of virtual lights.

A `GPURenderPassEncoder` object instance is created via the `GPUCommandEncoder.beginRenderPass()` property.

## Instance properties

- `label`
    A string providing a label that can be used to identify the object, for example in `GPUError` messages or console warnings.

## Instance methods

- `beginOcclusionQuery()`
    Begins an occlusion query at the specified index of the relevant `GPUQuerySet` (provided as the value of the `occlusionQuerySet` descriptor property when invoking `GPUCommandEncoder.beginRenderPass()` to run the render pass).
- `draw()`
    Draw primitives based on the vertex buffers provided by `setVertexBuffer()`.
- `drawIndexed()`
    Draw indexed primitives based on the vertex and index buffers provided by `setVertexBuffer()` and `setIndexBuffer()`
- `drawIndirect()`
    Draw primitives using parameters read from a `GPUBuffer`.
- `drawIndexedIndirect()`
    Draw indexed primitives using parameters read from a `GPUBuffer`.

- `end()`
    Completes recording of the current render pass <example-value> sequence.
- `endOcclusionQuery()`
    Ends an active occlusion query previously started with `beginOcclusionQuery()`.
- `executeBundles()`
    Executes commands previously recorded into the referenced `GPURenderBundle`s, as part of this render pass.
- `insertDebugMarker()`
    Marks a specific point in a series of encoded commands with a label.
- `popDebugGroup()`
    Ends a debug group, which is begun with a `pushDebugGroup()` call.
- `pushDebugGroup()`
    Begins a debug group, which is marked with a specified label, and will contain all subsequent encoded commands up until a `popDebugGroup()` method is invoked.
- `setBindGroup()`
    Sets the `GPUBindGroup` to use for subsequent render commands, for a given index.
- `setBlendConstant()`
    Sets the constant blend color and alpha values used with `"constant"` and `"one-minus-constant"` blend factors (as set in the descriptor of the `GPUDevice.createRenderPipeline()` method, in the `blend` property).

- `setIndexBuffer()`
    Sets the current `GPUBuffer` that will provide index data for subsequent drawing commands.

- `setPipeline()`
    Sets the `GPURenderPipeline` to use for this render pass.
- `setScissorRect()`
    Sets the scissor rectangle used during the rasterization stage. After transformation into viewport coordinates any fragments that fall outside the scissor rectangle will be discarded.
- `setStencilReference()`
    Sets the stencil reference value using during stencil tests with the `"replace"` stencil operation (as set in the descriptor of the `GPUDevice.createRenderPipeline()` method, in the properties defining the various stencil operations).

- `setVertexBuffer()`
    Sets or unsets the current `GPUBuffer` that will provide vertex data for subsequent drawing commands.
- `setViewport()`
    Sets the viewport used during the rasterization stage to linearly map from normalized device coordinates to viewport coordinates.

## Examples

In our basic <example-value> demo, several commands are recorded via a `GPUCommandEncoder`. Most of these commands originate from the `GPURenderPassEncoder` created via `GPUCommandEncoder.beginRenderPass()`.

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
