---
title: "GPUQueue"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpuqueue/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPUQueue

The **`GPUQueue`** interface of the `WebGPU API` controls execution of encoded commands on the GPU.

A device's primary queue is accessed via the `GPUDevice.queue` property.

## Instance properties

- `label`
    A string providing a label that can be used to identify the object, for example in `GPUError` messages or console warnings.

## Instance methods

- `copyExternalImageToTexture()`
    Copies a snapshot taken from a source image, video, or canvas into a given `GPUTexture`.
- `onSubmittedWorkDone()`
    Returns a `Promise` that resolves when all the work submitted to the GPU via this `GPUQueue` at the point the method is called has been processed.
- `submit()`
    Schedules the execution of command buffers represented by one or more `GPUCommandBuffer` objects by the GPU.
- `writeBuffer()`
    Writes a provided data source into a given `GPUBuffer`.
- `writeTexture()`
    Writes a provided data source into a given `GPUTexture`.

## Examples

In our basic <example-value> demo, we define some vertex data in a `Float32Array` that we'll use to draw a triangle:

```js
const vertices = new Float32Array([
  0.0, 0.6, 0, 1, 1, 0, 0, 1, -0.5, -0.6, 0, 1, 0, 1, 0, 1, 0.5, -0.6, 0, 1, 0,
  0, 1, 1,
]);
```

To use this data in a render pipeline, we need to put it into a `GPUBuffer`. First we'll create the buffer:

```js
const vertexBuffer = device.createBuffer({
  size: vertices.byteLength, // make it big enough to store vertices in
  usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
});
```

To get the data into the buffer we can use the `writeBuffer()` function, which lets the user agent determine most efficient way to copy the data over:

```js
device.queue.writeBuffer(vertexBuffer, 0, vertices, 0, vertices.length);
```

Later on, a set of commands is encoded into a `GPUCommandBuffer` using the `GPUCommandEncoder.finish()` method. The command buffer is then passed into the queue via a `submit()` call, ready to be processed by the GPU.

```js
device.queue.submit([commandEncoder.finish()]);
```

> **Note:**
> Study the WebGPU samples to find more queue examples.

## See also

- The WebGPU API
