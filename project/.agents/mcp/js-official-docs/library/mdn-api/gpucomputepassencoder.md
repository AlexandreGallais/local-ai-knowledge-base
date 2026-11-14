---
title: "GPUComputePassEncoder"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpucomputepassencoder/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPUComputePassEncoder

The **`GPUComputePassEncoder`** interface of the `WebGPU API` encodes commands related to controlling the compute shader stage, as issued by a `GPUComputePipeline`. It forms part of the overall encoding activity of a `GPUCommandEncoder`.

A compute pipeline contains a single compute stage in which a compute shader takes general data, processes it in parallel across a specified number of workgroups, then returns the result in one or more buffers.

A `GPUComputePassEncoder` object instance is created via the `GPUCommandEncoder.beginComputePass()` property.

## Instance properties

- `label`
    A string providing a label that can be used to identify the object, for example in `GPUError` messages or console warnings.

## Instance methods

- `dispatchWorkgroups()`
    Dispatches a specific grid of workgroups to perform the work being done by the current `GPUComputePipeline`.
- `dispatchWorkgroupsIndirect()`
    Dispatches a grid of workgroups, defined by the parameters of a `GPUBuffer`, to perform the work being done by the current `GPUComputePipeline`.
- `end()`
    Completes recording of the current compute pass <example-value> sequence.
- `insertDebugMarker()`
    Marks a specific point in a series of encoded commands with a label.
- `popDebugGroup()`
    Ends a debug group, which is begun with a `pushDebugGroup()` call.
- `pushDebugGroup()`
    Begins a debug group, which is marked with a specified label, and will contain all subsequent encoded commands up until a `popDebugGroup()` method is invoked.
- `setBindGroup()`
    Sets the `GPUBindGroup` to use for subsequent compute commands, for a given index.
- `setPipeline()`
    Sets the `GPUComputePipeline` to use for this compute pass.

## Examples

In our basic <example-value> demo, several commands are recorded via a `GPUCommandEncoder`. Most of these commands originate from the `GPUComputePassEncoder` created via `GPUCommandEncoder.beginComputePass()`.

```js
// …

// Create GPUCommandEncoder to encode commands to issue to the GPU
const commandEncoder = device.createCommandEncoder();

// Create GPUComputePassEncoder to initiate compute pass
const passEncoder = commandEncoder.beginComputePass();

// Issue commands
passEncoder.setPipeline(computePipeline);
passEncoder.setBindGroup(0, bindGroup);
passEncoder.dispatchWorkgroups(Math.ceil(BUFFER_SIZE / 64));

// End the compute pass
passEncoder.end();

// Copy output buffer to staging buffer
commandEncoder.copyBufferToBuffer(
  output,
  0, // Source offset
  stagingBuffer,
  0, // Destination offset
  BUFFER_SIZE,
);

// End frame by passing array of command buffers to command queue for execution
device.queue.submit([commandEncoder.finish()]);

// …
```

## See also

- The WebGPU API
