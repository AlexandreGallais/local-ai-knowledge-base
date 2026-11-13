---
title: "GPURenderPassEncoder: drawIndexed() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpurenderpassencoder/drawindexed/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPURenderPassEncoder: drawIndexed() method

The **`drawIndexed()`** method of the
`GPURenderPassEncoder` interface draws indexed primitives based on the vertex and index buffers provided by `setVertexBuffer()` and `setIndexBuffer()`.

## Syntax

```js
drawIndexed(indexCount)
drawIndexed(indexCount, instanceCount)
drawIndexed(indexCount, instanceCount, firstIndex)
drawIndexed(indexCount, instanceCount, firstIndex, baseVertex)
drawIndexed(indexCount, instanceCount, firstIndex, baseVertex, firstInstance)
```

### Parameters

- `indexCount`
    A number defining the number of indices to draw.
- `instanceCount` (optional)
    A number defining the number of instances to draw. If omitted, `instanceCount` defaults to 1.
- `firstIndex` (optional)
    A number defining the offset into the index buffer, in indices, to begin drawing from. If omitted, `firstIndex` defaults to 0.
- `baseVertex` (optional)
    A number added to each index value before indexing into the vertex buffers. If omitted, `baseVertex` defaults to 0.
- `firstInstance` (optional)
    A number defining the first instance to draw. If omitted, `firstInstance` defaults to 0.

### Return value

None (`undefined`).

## Examples

In the WebGPU Samples Shadow Mapping example, `drawIndexed()` is used in two separate render passes in each animation frame, one to populate the shadow buffer and one to draw the primary view of the scene. Study the example code listing for the full context.

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
