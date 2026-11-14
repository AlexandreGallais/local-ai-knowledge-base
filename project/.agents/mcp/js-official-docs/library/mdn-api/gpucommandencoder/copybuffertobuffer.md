---
title: "GPUCommandEncoder: copyBufferToBuffer() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpucommandencoder/copybuffertobuffer/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPUCommandEncoder: copyBufferToBuffer() method

The **`copyBufferToBuffer()`** method of the
`GPUCommandEncoder` interface encodes a command that copies data from one `GPUBuffer` to another.

## Syntax

```js
copyBufferToBuffer(source, destination)
copyBufferToBuffer(source, destination, size)
copyBufferToBuffer(source, sourceOffset, destination, destinationOffset, size)
```

### Parameters

- `source`
    The `GPUBuffer` to copy from.
- `sourceOffset` (optional)
    The offset, in bytes, into the `source` to begin copying from.
- `destination`
    The `GPUBuffer` to copy to.
- `destinationOffset` (optional)
    The offset, in bytes, into the `destination` to begin copying to.
- `size` (optional)
    The number of bytes to copy.

> **Note:**
> The `sourceOffset` and `destinationOffset` can be omitted if you are copying part of the source buffer at a `0` offset in both the source and destination buffers. The `sourceOffset`, `destinationOffset`, and `size` can be omitted if you are copying the entire source buffer to the destination buffer.

### Return value

None (`undefined`).

### Validation

The following criteria must be met when calling **`copyBufferToBuffer()`**, otherwise a `GPUValidationError` is generated and the `GPUCommandEncoder` becomes invalid:

- The `source`'s `GPUBuffer.usage` includes the `GPUBufferUsage.COPY_SRC` flag.
- The `destination`'s `GPUBuffer.usage` includes the `GPUBufferUsage.COPY_DST` flag.
- `size`, `sourceOffset`, and `destinationOffset` are all multiples of 4.
- The `source`'s `GPUBuffer.size` is greater than or equal to `sourceOffset` + `size`.
- The `destination`'s `GPUBuffer.size` is greater than or equal to `destinationOffset` + `size`.
- `source` and `destination` are different `GPUBuffer`s (you can't copy from and to the same buffer).

## Examples

In our basic <example-value> demo, we use `copyBufferToBuffer()` to copy the contents of our `outputBuffer` to the `stagingBuffer`.

```js
// …

// Create an output buffer to read GPU calculations to, and a staging buffer to be mapped for JavaScript access

const outputBuffer = device.createBuffer({
  size: BUFFER_SIZE,
  usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC,
});

const stagingBuffer = device.createBuffer({
  size: BUFFER_SIZE,
  usage: GPUBufferUsage.MAP_READ | GPUBufferUsage.COPY_DST,
});

// …

// Create GPUCommandEncoder to encode commands to issue to the GPU
const commandEncoder = device.createCommandEncoder();

// …

// Copy output buffer to staging buffer
commandEncoder.copyBufferToBuffer(
  outputBuffer,
  0, // Source offset
  stagingBuffer,
  0, // Destination offset
  BUFFER_SIZE,
);

// Since we are copying the entire buffer, this can be shortened to
// commandEncoder.copyBufferToBuffer(outputBuffer, stagingBuffer);

// …
```

## See also

- The WebGPU API
