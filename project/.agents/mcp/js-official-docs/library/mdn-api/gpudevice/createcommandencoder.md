---
title: "GPUDevice: createCommandEncoder() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpudevice/createcommandencoder/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPUDevice: createCommandEncoder() method

The **`createCommandEncoder()`** method of the
`GPUDevice` interface creates a `GPUCommandEncoder`, used to encode commands to be issued to the GPU.

## Syntax

```js
createCommandEncoder()
createCommandEncoder(descriptor)
```

### Parameters

- `descriptor` (optional)
    An object containing the following properties:
    - `label` (optional)
        A string providing a label that can be used to identify the object, for example in `GPUError` messages or console warnings.

### Return value

A `GPUCommandEncoder` object instance.

## Examples

In our basic <example-value> demo, several commands are recorded via a `GPUCommandEncoder` created via `createCommandEncoder()`:

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
> Study the WebGPU samples to find more command encoding examples.

## See also

- The WebGPU API
