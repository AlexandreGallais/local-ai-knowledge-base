---
title: "GPUQueue: submit() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpuqueue/submit/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPUQueue: submit() method

The **`submit()`** method of the
`GPUQueue` interface schedules the execution of command buffers represented by one or more `GPUCommandBuffer` objects by the GPU.

## Syntax

```js
submit(commandBuffers)
```

### Parameters

- `commandBuffers`
    An array of `GPUCommandBuffer` objects containing the commands to be enqueued for processing by the GPU. The array must not contain duplicate `GPUCommandBuffer` objects — each one can only be submitted once per `submit()` call.

### Return value

None (`undefined`).

### Validation

The following criteria must be met when calling **`submit()`**, otherwise a `GPUValidationError` is generated and the `GPUQueue` becomes invalid:

- The array of `GPUCommandBuffer` objects referenced in the `submit()` call does not contain duplicates.
- Any `GPUBuffer`, `GPUTexture`, and `GPUQuerySet` objects used in the encoded commands are available for use, i.e., not unavailable (`GPUBuffer`s are unavailable if they are currently `mapped`) or destroyed (with the `destroy()` method).
- Any `GPUExternalTexture` objects used in the encoded commands are not expired (they expire automatically shortly after being imported via `importExternalTexture()`).
- If a `GPUQuerySet` object used in an encoded command is of type `"occlusion"` query, it is not already used, except by `GPURenderPassEncoder.beginOcclusionQuery()`.

## Examples

In our basic <example-value> demo, a number of commands are recorded via a `GPUCommandEncoder`:

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

The commands encoded by the `GPUCommandEncoder` are recoded into a `GPUCommandBuffer` using the `GPUCommandEncoder.finish()` method. The command buffer is then passed into the queue via a `submit()` call, ready to be processed by the GPU.

```js
device.queue.submit([commandEncoder.finish()]);
```

> **Note:**
> Study the WebGPU samples to find more queue examples.

## See also

- The WebGPU API
