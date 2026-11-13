---
title: "GPURenderPassEncoder: popDebugGroup() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpurenderpassencoder/popdebuggroup/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPURenderPassEncoder: popDebugGroup() method

The **`popDebugGroup()`** method of the
`GPURenderPassEncoder` interface ends a render pass debug group, which is begun with a `pushDebugGroup()` call.

This could be used for telemetry, or may be utilized in `GPUError` messages, browser dev tools, or other services in the future to help with debugging.

## Syntax

```js
popDebugGroup()
```

### Parameters

None.

### Return value

None (`undefined`).

### Validation

The following criteria must be met when calling **`popDebugGroup()`**, otherwise a `GPUValidationError` is generated and the `GPURenderPassEncoder` becomes invalid:

- The render pass <example-value>'s debug stack is not empty (i.e., at least one render pass debug group was previously started with `pushDebugGroup()`).

## Examples

```js
// …

const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);

passEncoder.pushDebugGroup("my_group_marker"); // Start labeled debug group

passEncoder.setPipeline(renderPipeline);
passEncoder.setVertexBuffer(0, vertexBuffer);
passEncoder.draw(3);

passEncoder.popDebugGroup();

// …
```

## See also

- The WebGPU API
