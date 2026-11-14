---
title: "GPUCommandEncoder: beginComputePass() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpucommandencoder/begincomputepass/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPUCommandEncoder: beginComputePass() method

The **`beginComputePass()`** method of the
`GPUCommandEncoder` interface starts encoding a compute pass, returning a `GPUComputePassEncoder` that can be used to control computation.

## Syntax

```js
beginComputePass()
beginComputePass(descriptor)
```

### Parameters

- `descriptor` (optional)
    An object containing the following properties:
    - `label` (optional)
        A string providing a label that can be used to identify the object, for example in `GPUError` messages or console warnings.
    - `timestampWrites` (optional)
        An array of objects defining where and when timestamp query values will be written for this pass. These objects have the following properties:
        - `querySet`
            A `GPUQuerySet` of type `"timestamp"` that the timestamp query results will be written to.
        - `beginningOfPassWriteIndex`
            A number specifying the query index in `querySet` where the timestamp at the beginning of the render pass will be written. This is optional - if not defined, no timestamp will be written for the beginning of the pass.
        - `endOfPassWriteIndex`
            A number specifying the query index in `querySet` where the timestamp at the end of the render pass will be written. This is optional - if not defined, no timestamp will be written for the end of the pass.

        > **Note:**
        > The `timestamp-query` feature needs to be enabled to use timestamp queries. Timestamp query values are written in nanoseconds, but how the value is determined is implementation-defined.

### Return value

A `GPUComputePassEncoder` object instance.

### Validation

The following criteria must be met when calling **`beginComputePass()`**, otherwise a `GPUValidationError` is generated and an invalid `GPUComputePassEncoder` is returned:

- The `timestamp-query` `feature` is enabled in the `GPUDevice`.

## Examples

In our basic <example-value> demo, several commands are recorded via a `GPUCommandEncoder`. Most of these commands originate from the `GPUComputePassEncoder` created via `beginComputePass()`.

```js
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
