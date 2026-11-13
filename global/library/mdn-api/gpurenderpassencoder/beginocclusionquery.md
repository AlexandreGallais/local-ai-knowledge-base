---
title: "GPURenderPassEncoder: beginOcclusionQuery() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpurenderpassencoder/beginocclusionquery/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPURenderPassEncoder: beginOcclusionQuery() method

The **`beginOcclusionQuery()`** method of the
`GPURenderPassEncoder` interface begins an occlusion query at the specified index of the relevant `GPUQuerySet` (provided as the value of the `occlusionQuerySet` descriptor property when invoking `GPUCommandEncoder.beginRenderPass()` to run the render pass).

## Syntax

```js
beginOcclusionQuery(queryIndex)
```

### Parameters

- `queryIndex`
    The index in the `GPUQuerySet` to begin the occlusion query at.

### Return value

None (`undefined`).

### Validation

The following criteria must be met when calling **`beginOcclusionQuery()`**, otherwise a `GPUValidationError` is generated and the `GPURenderPassEncoder` becomes invalid:

- A `GPUQuerySet` was specified in the `occlusionQuerySet` descriptor property when invoking the originating `GPUCommandEncoder.beginRenderPass()`.
- `queryIndex` is smaller than `GPUQuerySet.count`.
- The `queryIndex` has not already been written to in the same render pass.
- An occlusion query is not already active for this render pass (i.e., via a previous `beginOcclusionQuery()` call).

## Examples

```js
// …

// Create a query set to hold the occlusion queries
const querySet = device.createQuerySet({
  type: "occlusion",
  count: 32,
});

// Render pass <example-value> object, including the querySet
const renderPassDescriptor = {
  colorAttachments: [
    {
      clearValue: clearColor,
      loadOp: "clear",
      storeOp: "store",
      view: context.getCurrentTexture().createView(),
    },
  ],
  occlusionQuerySet: querySet,
};

// Begin the render pass
const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);

// Begin an occlusion query at index 0
passEncoder.beginOcclusionQuery(0);

// Run some rendering commands
passEncoder.setPipeline(renderPipeline);
passEncoder.setVertexBuffer(0, vertexBuffer);
passEncoder.draw(3);

// End the occlusion query
passEncoder.endOcclusionQuery();

// …
```

## See also

- The WebGPU API
