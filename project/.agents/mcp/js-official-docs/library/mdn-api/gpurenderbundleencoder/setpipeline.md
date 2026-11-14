---
title: "GPURenderBundleEncoder: setPipeline() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpurenderbundleencoder/setpipeline/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPURenderBundleEncoder: setPipeline() method

The **`setPipeline()`** method of the
`GPURenderBundleEncoder` interface sets the `GPURenderPipeline` to use for subsequent render bundle commands.

> **Note:**
> This method is functionally identical to its equivalent on `GPURenderPassEncoder` — `setPipeline()`.

## Syntax

```js
setPipeline(pipeline)
```

### Parameters

- `pipeline`
    The `GPURenderPipeline` to use for subsequent render bundle commands.

### Return value

None (`undefined`).

### Validation

The following criteria must be met when calling **`setPipeline()`**, otherwise a `GPUValidationError` is generated and the `GPURenderBundleEncoder` becomes invalid:

- If the `GPURenderPipeline` writes to the depth component of the depth/stencil attachment, `depthReadOnly` (as specified in the descriptor of the originating `GPUCommandEncoder.beginRenderPass()` call) is `true`.
- If the `GPURenderPipeline` writes to the stencil component of the depth/stencil attachment, `stencilReadOnly` (as specified in the descriptor of the originating `GPUCommandEncoder.beginRenderPass()` call) is `true`.

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
