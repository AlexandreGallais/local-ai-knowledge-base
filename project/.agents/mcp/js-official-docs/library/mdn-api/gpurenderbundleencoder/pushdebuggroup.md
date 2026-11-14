---
title: "GPURenderBundleEncoder: pushDebugGroup() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpurenderbundleencoder/pushdebuggroup/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPURenderBundleEncoder: pushDebugGroup() method

The **`pushDebugGroup()`** method of the
`GPURenderBundleEncoder` interface begins a render bundle debug group, which is marked with a specified label, and will contain all subsequent encoded commands up until a `popDebugGroup()` method is invoked.

This could be used for telemetry, or may be utilized in `GPUError` messages, browser dev tools, or other services in the future to help with debugging.

> **Note:**
> This method is functionally identical to its equivalent on `GPURenderPassEncoder` — `pushDebugGroup()`.

## Syntax

```js
pushDebugGroup(groupLabel)
```

### Parameters

- `groupLabel`
    A string representing the label for the debug group.

### Return value

None (`undefined`).

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
