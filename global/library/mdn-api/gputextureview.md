---
title: "GPUTextureView"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gputextureview/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPUTextureView

The **`GPUTextureView`** interface of the `WebGPU API` represents a view into a subset of the texture resources defined by a particular `GPUTexture`.

A `GPUTextureView` object instance is created using the `GPUTexture.createView()` method.

## Instance properties

- `label`
    A string providing a label that can be used to identify the object, for example in `GPUError` messages or console warnings.

## Examples

In the WebGPU Samples Cubemap demo, you will see multiple examples of how `GPUTextureView`s (created by `GPUTexture.createView()` calls) are used, both as a `resource` in a `GPUDevice.createBindGroup()` call, and as a provided `view` in the `depthStencilAttachment` object of a `GPUCommandEncoder.beginRenderPass()` descriptor.

```js
const uniformBindGroup = device.createBindGroup({
  layout: pipeline.getBindGroupLayout(0),
  entries: [
    {
      binding: 0,
      resource: {
        buffer: uniformBuffer,
        offset: 0,
        size: uniformBufferSize,
      },
    },
    {
      binding: 1,
      resource: sampler,
    },
    {
      binding: 2,
      resource: cubemapTexture.createView({
        dimension: "cube",
      }),
    },
  ],
});

const renderPassDescriptor = {
  colorAttachments: [
    {
      view: undefined, // Assigned later
      loadOp: "clear",
      storeOp: "store",
    },
  ],
  depthStencilAttachment: {
    view: depthTexture.createView(),
    depthClearValue: 1.0,
    depthLoadOp: "clear",
    depthStoreOp: "store",
  },
};

// …

const commandEncoder = device.createCommandEncoder();
const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);

// …
```

## See also

- The WebGPU API
