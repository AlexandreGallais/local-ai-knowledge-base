---
title: "GPURenderBundleEncoder: draw() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpurenderbundleencoder/draw/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPURenderBundleEncoder: draw() method

The **`draw()`** method of the
`GPURenderBundleEncoder` interface draws primitives based on the vertex buffers provided by `setVertexBuffer()`.

> **Note:**
> This method is functionally identical to its equivalent on `GPURenderPassEncoder` — `draw()`.

## Syntax

```js
draw(vertexCount)
draw(vertexCount, instanceCount)
draw(vertexCount, instanceCount, firstVertex)
draw(vertexCount, instanceCount, firstVertex, firstInstance)
```

### Parameters

- `vertexCount`
    A number defining the number of vertices to draw.
- `instanceCount` (optional)
    A number defining the number of instances to draw. If omitted, `instanceCount` defaults to 1.
- `firstVertex` (optional)
    A number defining the offset into the vertex buffers, in vertices, to begin drawing from. If omitted, `firstVertex` defaults to 0.
- `firstInstance` (optional)
    A number defining the first instance to draw. If omitted, `firstInstance` defaults to 0.

### Return value

None (`undefined`).

## Examples

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

## See also

- The WebGPU API
