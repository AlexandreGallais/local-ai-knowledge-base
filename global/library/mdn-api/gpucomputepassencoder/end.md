---
title: "GPUComputePassEncoder: end() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpucomputepassencoder/end/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPUComputePassEncoder: end() method

The **`end()`** method of the
`GPUComputePassEncoder` interface completes recording of the current compute pass <example-value> sequence.

## Syntax

```js
end()
```

### Parameters

None.

### Return value

None (`undefined`).

### Validation

The following criteria must be met when calling **`end()`**, otherwise a `GPUValidationError` is generated and the `GPUComputePassEncoder` becomes invalid:

- The `GPUComputePassEncoder` is open (i.e., not already ended via an `end()` call).
- any `pushDebugGroup()` calls made on this encoder have a corresponding `popDebugGroup()` call before `end()` is called.

## Examples

In our basic <example-value> demo, several commands are recorded via a `GPUCommandEncoder`. Most of these commands originate from the `GPUComputePassEncoder` created via `GPUCommandEncoder.beginComputePass()`.

```js
const BUFFER_SIZE = 1000;

// …

// Create GPUCommandEncoder to encode commands to issue to the GPU
const commandEncoder = device.createCommandEncoder();

// Initiate compute pass
const passEncoder = commandEncoder.beginComputePass();

// Issue commands
passEncoder.setPipeline(computePipeline);
passEncoder.setBindGroup(0, bindGroup);
passEncoder.dispatchWorkgroups(Math.ceil(BUFFER_SIZE / 64));

// End the render pass
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
