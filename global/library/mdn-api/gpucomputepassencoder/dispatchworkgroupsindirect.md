---
title: "GPUComputePassEncoder: dispatchWorkgroupsIndirect() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpucomputepassencoder/dispatchworkgroupsindirect/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPUComputePassEncoder: dispatchWorkgroupsIndirect() method

The **`dispatchWorkgroupsIndirect()`** method of the
`GPUComputePassEncoder` interface dispatches a grid of workgroups, defined by the parameters of a `GPUBuffer`, to perform the work being done by the current `GPUComputePipeline` (i.e., set via `GPUComputePassEncoder.setPipeline()`).

## Syntax

```js
dispatchWorkgroupsIndirect(indirectBuffer, indirectOffset)
```

### Parameters

- `indirectBuffer`
    A `GPUBuffer` containing the X, Y, and Z dimensions of the grid of workgroups to dispatch. The buffer must contain a tightly packed block of three 32-bit unsigned integer values representing the dimensions (12 bytes total), given in the same order as the arguments for `GPUComputePassEncoder.dispatchWorkgroups()`. So for example:

    ```js
    const uint32 = new Uint32Array(3);
    uint32[0] = 25; // The X value
    uint32[1] = 1; // The Y value
    uint32[2] = 1; // The Z value

    // Write values into a GPUBuffer
    device.queue.writeBuffer(buffer, 0, uint32, 0, uint32.length);
    ```

- `indirectOffset`
    The offset, in bytes, into `indirectBuffer` where the dimension data begins.

> **Note:**
> The X, Y, and Z dimension values passed to `GPUComputePassEncoder.dispatchWorkgroups()` and `dispatchWorkgroupsIndirect()` are the number of workgroups to dispatch for each dimension, not the number of shader invocations to perform across each dimension. This matches the behavior of modern native GPU APIs, but differs from the behavior of OpenCL. This means that if a `GPUShaderModule` defines an entry point with `@workgroup_size(4, 4)`, and work is dispatched to it with the call `dispatchWorkgroupsIndirect(indirectBuffer);` with `indirectBuffer` specifying X and Y dimensions of 8 and 8, the entry point will be invoked 1024 times total — Dispatching a 4 x 4 workgroup 8 times along both the X and Y axes. `4 * 4 * 8 * 8 = 1024`.

### Return value

None (`undefined`).

### Validation

The following criteria must be met when calling **`dispatchWorkgroupsIndirect()`**, otherwise a `GPUValidationError` is generated and the `GPUComputePassEncoder` becomes invalid:

- `indirectBuffer`'s `GPUBuffer.usage` contains the `GPUBufferUsage.INDIRECT` flag.
- `indirectOffset` + the total size specified by the `X`, `Y`, and `Z` dimensions is less than or equal to the `indirectBuffer`'s `GPUBuffer.size`.
- `indirectOffset` is a multiple of 4.

## Examples

```js
// Set global buffer size
const BUFFER_SIZE = 1000;

// Compute shader; note workgroup size of 64
const shader = `
@group(0) @binding(0)
var<storage, read_write> output: array<f32>;

@compute @workgroup_size(64)

...

`;

// …

// Create GPUCommandEncoder to encode commands to issue to the GPU
const commandEncoder = device.createCommandEncoder();

// Initiate compute pass
const passEncoder = commandEncoder.beginComputePass();

// Issue commands
passEncoder.setPipeline(computePipeline);
passEncoder.setBindGroup(0, bindGroup);

const uint32 = new Uint32Array(3);
// Note workgroupCountX is set based on the global buffer size and the shader workgroup count.
uint32[0] = Math.ceil(BUFFER_SIZE / 64);
uint32[1] = 1;
uint32[2] = 1;

const workgroupDimensions = device.createBuffer({
  size: 12,
  usage: GPUBufferUsage.COPY_DST | GPUBufferUsage.INDIRECT,
});
device.queue.writeBuffer(workgroupDimensions, 0, uint32, 0, uint32.length);

passEncoder.dispatchWorkgroupsIndirect(workgroupDimensions, 0);

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
