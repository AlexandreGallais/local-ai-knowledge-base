---
title: "GPUAdapterInfo: architecture property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpuadapterinfo/architecture/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPUAdapterInfo: architecture property

The **`architecture`** read-only property of the
`GPUAdapterInfo` interface returns the name of the family or class of GPUs the adapter belongs to, or an empty string if it is not available.

## Value

A string.

## Examples

```js
const adapter = await navigator.gpu.requestAdapter();
if (!adapter) {
  throw Error("Couldn't request WebGPU adapter.");
}

const adapterInfo = adapter.info;
console.log(adapterInfo.architecture);
```

## See also

- The WebGPU API
