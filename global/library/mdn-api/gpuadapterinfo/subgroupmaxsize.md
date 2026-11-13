---
title: "GPUAdapterInfo: subgroupMaxSize property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpuadapterinfo/subgroupmaxsize/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPUAdapterInfo: subgroupMaxSize property

The **`subgroupMaxSize`** read-only property of the `GPUAdapterInfo` interface returns the maximum supported subgroup size for the `GPUAdapter`. This can be used along with the `subgroups` feature.

## Value

A number.

## Examples

```js
const adapter = await navigator.gpu.requestAdapter();
if (!adapter) {
  throw Error("Couldn't request WebGPU adapter.");
}

const adapterInfo = adapter.info;
console.log(adapterInfo.subgroupMaxSize);
```

## See also

- The WebGPU API
