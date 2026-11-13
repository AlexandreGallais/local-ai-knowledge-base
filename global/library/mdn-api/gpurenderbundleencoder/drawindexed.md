---
title: "GPURenderBundleEncoder: drawIndexed() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpurenderbundleencoder/drawindexed/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPURenderBundleEncoder: drawIndexed() method

The **`drawIndexed()`** method of the
`GPURenderBundleEncoder` interface draws indexed primitives based on the vertex and index buffers provided by `setVertexBuffer()` and `setIndexBuffer()`.

> **Note:**
> This method is functionally identical to its equivalent on `GPURenderPassEncoder` — `drawIndexed()`.

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

```js
// …

const bundleEncoder = device.createRenderBundleEncoder(descriptor);

bundleEncoder.setPipeline(pipeline);
bundleEncoder.setBindGroup(0, sceneBindGroupForRender);
bundleEncoder.setBindGroup(1, modelBindGroup);
bundleEncoder.setVertexBuffer(0, vertexBuffer);
bundleEncoder.setIndexBuffer(indexBuffer, "uint16");
bundleEncoder.drawIndexed(indexCount);

const renderBundle = bundleEncoder.finish();

// …
```

## See also

- The WebGPU API
