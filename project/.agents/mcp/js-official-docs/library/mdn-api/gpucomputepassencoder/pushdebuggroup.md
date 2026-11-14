---
title: "GPUComputePassEncoder: pushDebugGroup() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpucomputepassencoder/pushdebuggroup/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPUComputePassEncoder: pushDebugGroup() method

The **`pushDebugGroup()`** method of the
`GPUComputePassEncoder` interface begins a compute pass debug group, which is marked with a specified label, and will contain all subsequent encoded commands up until a `popDebugGroup()` method is invoked.

This could be used for telemetry, or may be utilized in `GPUError` messages, browser dev tools, or other services in the future to help with debugging.

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

const passEncoder = commandEncoder.beginComputePass();

passEncoder.pushDebugGroup("my_group_marker"); // Start labeled debug group

passEncoder.setPipeline(computePipeline);
passEncoder.setBindGroup(0, bindGroup);
passEncoder.dispatchWorkgroups(Math.ceil(BUFFER_SIZE / 64));

passEncoder.popDebugGroup();

// …
```

## See also

- The WebGPU API
