---
title: "GPUCommandEncoder"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpucommandencoder/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPUCommandEncoder

The **`GPUCommandEncoder`** interface of the `WebGPU API` represents an encoder that collects a sequence of GPU commands to be issued to the GPU.

A `GPUCommandEncoder` object instance is created via the `GPUDevice.createCommandEncoder()` property.

## Instance properties

- `label`
    A string providing a label that can be used to identify the object, for example in `GPUError` messages or console warnings.

## Instance methods

- `beginComputePass()`
    Starts encoding a compute pass, returning a `GPUComputePassEncoder` that can be used to control computation.
- `beginRenderPass()`
    Starts encoding a render pass, returning a `GPURenderPassEncoder` that can be used to control rendering.
- `clearBuffer()`
    Encodes a command that fills a region of a `GPUBuffer` with zeroes.
- `copyBufferToBuffer()`
    Encodes a command that copies data from one `GPUBuffer` to another.
- `copyBufferToTexture()`
    Encodes a command that copies data from a `GPUBuffer` to a `GPUTexture`.
- `copyTextureToBuffer()`
    Encodes a command that copies data from a `GPUTexture` to a `GPUBuffer`.
- `copyTextureToTexture()`
    Encodes a command that copies data from one `GPUTexture` to another.
- `finish()`
    Completes recording of the command sequence encoded on this `GPUCommandEncoder`, returning a corresponding `GPUCommandBuffer`.

- `insertDebugMarker()`
    Marks a specific point in a series of encoded commands with a label.
- `popDebugGroup()`
    Ends a debug group, which is begun with a `pushDebugGroup()` call.
- `pushDebugGroup()`
    Begins a debug group, which is marked with a specified label, and will contain all subsequent encoded commands up until a `popDebugGroup()` method is invoked.

- `resolveQuerySet()`
    Encodes a command that resolves a `GPUQuerySet`, copying the results into a specified `GPUBuffer`.
- `writeTimestamp()` (non-standard) (deprecated)
    Encodes a command that writes a timestamp into a `GPUQuerySet` once the previous commands recorded into the same queued `GPUCommandBuffer` have been executed by the GPU.

## Examples

In our basic <example-value> demo, several commands are recorded via a `GPUCommandEncoder`:

```js
// …

// Create GPUCommandEncoder
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

// Draw a triangle

passEncoder.setPipeline(renderPipeline);
passEncoder.setVertexBuffer(0, vertexBuffer);
passEncoder.draw(3);

// End the render pass

passEncoder.end();

// …
```

The commands encoded by the `GPUCommandEncoder` are recorded into a `GPUCommandBuffer` using the `GPUCommandEncoder.finish()` method. The command buffer is then passed into the queue via a `submit()` call, ready to be processed by the GPU.

```js
device.queue.submit([commandEncoder.finish()]);
```

> **Note:**
> Study the WebGPU samples to find more command encoding examples.

## See also

- The WebGPU API
