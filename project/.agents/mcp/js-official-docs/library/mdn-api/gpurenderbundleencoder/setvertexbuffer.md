---
title: "GPURenderBundleEncoder: setVertexBuffer() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpurenderbundleencoder/setvertexbuffer/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPURenderBundleEncoder: setVertexBuffer() method

The **`setVertexBuffer()`** method of the
`GPURenderBundleEncoder` interface sets or unsets the current `GPUBuffer` for the given slot that will provide vertex data for subsequent drawing commands.

> **Note:**
> This method is functionally identical to its equivalent on `GPURenderPassEncoder` — `setVertexBuffer()`.

## Syntax

```js
setVertexBuffer(slot, buffer, offset, size)
```

### Parameters

- `slot`
    A number referencing the vertex buffer slot to set the vertex buffer for.
- `buffer`
    A `GPUBuffer` representing the buffer containing the vertex data to use for subsequent drawing commands, or `null`, in which case any previously-set buffer in the given slot is unset.
- `offset` (optional)
    A number representing the offset, in bytes, into `buffer` where the vertex data begins. If omitted, `offset` defaults to 0.
- `size` (optional)
    A number representing the size, in bytes, of the vertex data contained in `buffer`. If omitted, `size` defaults to the `buffer`'s `GPUBuffer.size` - `offset`.

### Return value

None (`undefined`).

### Validation

The following criteria must be met when calling **`setVertexBuffer()`**, otherwise a `GPUValidationError` is generated and the `GPURenderBundleEncoder` becomes invalid:

- `buffer`'s `GPUBuffer.usage` contains the `GPUBufferUsage.VERTEX` flag.
- `slot` is less than the `GPUDevice`'s `maxVertexBuffers` `limit`.
- `offset` + `size` is less than or equal to the `buffer`'s `GPUBuffer.size`.
- `offset` is a multiple of 4.

## Examples

### Set vertex buffer

```js
function recordRenderPass(passEncoder) {
  if (settings.dynamicOffsets) {
    passEncoder.setPipeline(dynamicPipeline);
  } else {
    passEncoder.setPipeline(pipeline);
  }
  passEncoder.setVertexBuffer(0, vertexBuffer);
  passEncoder.setBindGroup(0, timeBindGroup);
  const dynamicOffsets = [0];
  for (let i = 0; i < numTriangles; ++i) {
    if (settings.dynamicOffsets) {
      dynamicOffsets[0] = i * alignedUniformBytes;
      passEncoder.setBindGroup(1, dynamicBindGroup, dynamicOffsets);
    } else {
      passEncoder.setBindGroup(1, bindGroups[i]);
    }
    passEncoder.draw(3, 1, 0, 0);
  }
}
```

The above snippet is taken from the WebGPU Samples Animometer example.

### Unset vertex buffer

```js
// Set vertex buffer in slot 0
passEncoder.setVertexBuffer(0, vertexBuffer);

// Later, unset vertex buffer in slot 0
passEncoder.setVertexBuffer(0, null);
```

## See also

- The WebGPU API
