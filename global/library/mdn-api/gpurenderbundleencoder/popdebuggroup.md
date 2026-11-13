---
title: "GPURenderBundleEncoder: popDebugGroup() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpurenderbundleencoder/popdebuggroup/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPURenderBundleEncoder: popDebugGroup() method

The **`popDebugGroup()`** method of the
`GPURenderBundleEncoder` interface ends a render bundle debug group, which is begun with a `pushDebugGroup()` call.

This could be used for telemetry, or may be utilized in `GPUError` messages, browser dev tools, or other services in the future to help with debugging.

> **Note:**
> This method is functionally identical to its equivalent on `GPURenderPassEncoder` — `popDebugGroup()`.

## Syntax

```js
popDebugGroup()
```

### Parameters

None.

### Return value

None (`undefined`).

### Validation

The following criteria must be met when calling **`popDebugGroup()`**, otherwise a `GPUValidationError` is generated and the `GPURenderBundleEncoder` becomes invalid:

- The render bundle encoder's debug stack is not empty (i.e., at least one render bundle debug group was previously started with `pushDebugGroup()`).

## Examples

```js
// …

const bundleEncoder = device.createRenderBundleEncoder(renderBundleDescriptor);

bundleEncoder.pushDebugGroup("my_group_marker"); // Start labeled debug group

bundleEncoder.setPipeline(renderPipeline);
bundleEncoder.setVertexBuffer(0, vertexBuffer);
bundleEncoder.draw(3);

bundleEncoder.popDebugGroup();

// …
```

## See also

- The WebGPU API
