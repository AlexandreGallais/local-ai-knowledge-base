---
title: "GPUCommandEncoder: clearBuffer() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpucommandencoder/clearbuffer/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPUCommandEncoder: clearBuffer() method

The **`clearBuffer()`** method of the
`GPUCommandEncoder` interface encodes a command that fills a region of a `GPUBuffer` with zeroes.

## Syntax

```js
clearBuffer(buffer)
clearBuffer(buffer, offset)
clearBuffer(buffer, offset, size)
```

### Parameters

- `buffer`
    A `GPUBuffer` object representing the buffer to clear.
- `offset` (optional)
    A number representing the offset, in bytes, from the start of the `buffer` to the sub-region to clear. If omitted, `offset` defaults to 0.
- `size` (optional)
    A number representing the size, in bytes, of the sub-region to clear. If omitted, `size` defaults to the `buffer` size - `offset`.

### Return value

None (`undefined`).

### Validation

The following criteria must be met when calling **`clearBuffer()`**, otherwise a `GPUValidationError` is generated and the `GPUCommandEncoder` becomes invalid:

- The `buffer`'s `GPUBuffer.usage` includes the `GPUBufferUsage.COPY_DST` flag.
- `offset` and `size` are both multiples of 4.
- The `buffer`'s `GPUBuffer.size` is greater than or equal to `offset` + `size`.

## Examples

```js
// …

const buffer = device.createBuffer({
  size: 1000,
  usage: GPUBufferUsage.MAP_READ | GPUBufferUsage.COPY_DST,
});

// Later on

const commandBuffer = device.createCommandEncoder();
commandEncoder.clearBuffer(buffer);

// …
```

## See also

- The WebGPU API
