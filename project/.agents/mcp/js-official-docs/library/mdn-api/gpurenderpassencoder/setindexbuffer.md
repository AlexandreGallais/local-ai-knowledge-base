---
title: "GPURenderPassEncoder: setIndexBuffer() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpurenderpassencoder/setindexbuffer/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPURenderPassEncoder: setIndexBuffer() method

The **`setIndexBuffer()`** method of the
`GPURenderPassEncoder` interface sets the current `GPUBuffer` that will provide index data for subsequent drawing commands.

## Syntax

```js
setIndexBuffer(buffer, indexFormat, offset, size)
```

### Parameters

- `buffer`
    A `GPUBuffer` representing the buffer containing the index data to use for subsequent drawing commands.
- `indexFormat`
    An enumerated value that defines the format of the index data contained in `buffer`. Possible values are:
    - `"uint16"`
    - `"uint32"`
- `offset` (optional)
    A number representing the offset, in bytes, into `buffer` where the index data begins. If omitted, `offset` defaults to 0.
- `size` (optional)
    A number representing the size, in bytes, of the index data contained in `buffer`. If omitted, `size` defaults to the `buffer`'s `GPUBuffer.size` - `offset`.

#### Note on indexFormat

`indexFormat` determines both the data type of index values in a buffer and, when used with a pipeline that specifies a strip primitive topology (`"line-strip"` or `"triangle-strip"`), also determines the primitive restart value. The primitive restart value is an index value indicating that a new primitive should be started rather than continuing to construct the strip with the prior indexed vertices. The value is `0xFFFF` for `"uint16"`, or `0xFFFFFFFF` for `"uint32"`.

### Return value

None (`undefined`).

### Validation

The following criteria must be met when calling **`setIndexBuffer()`**, otherwise a `GPUValidationError` is generated and the `GPURenderPassEncoder` becomes invalid:

- `buffer`'s `GPUBuffer.usage` contains the `GPUBufferUsage.INDEX` flag.
- `offset` + `size` is less than or equal to the `buffer`'s `GPUBuffer.size`.
- `offset` is a multiple of `indexFormat`'s byte size (2 for `"uint16"`, 4 for `"uint32"`).

## Examples

In the WebGPU Samples Shadow Mapping example, `setIndexBuffer()` is used in two separate render passes in each animation frame, one to draw the main model and one to draw its shadow. Study the example code listing for the full context.

```js
// …

const commandEncoder = device.createCommandEncoder();
{
  const shadowPass = commandEncoder.beginRenderPass(shadowPassDescriptor);
  shadowPass.setPipeline(shadowPipeline);
  shadowPass.setBindGroup(0, sceneBindGroupForShadow);
  shadowPass.setBindGroup(1, modelBindGroup);
  shadowPass.setVertexBuffer(0, vertexBuffer);
  shadowPass.setIndexBuffer(indexBuffer, "uint16");
  shadowPass.drawIndexed(indexCount);

  shadowPass.end();
}
{
  const renderPass = commandEncoder.beginRenderPass(renderPassDescriptor);
  renderPass.setPipeline(pipeline);
  renderPass.setBindGroup(0, sceneBindGroupForRender);
  renderPass.setBindGroup(1, modelBindGroup);
  renderPass.setVertexBuffer(0, vertexBuffer);
  renderPass.setIndexBuffer(indexBuffer, "uint16");
  renderPass.drawIndexed(indexCount);

  renderPass.end();
}

// …
```

## See also

- The WebGPU API
