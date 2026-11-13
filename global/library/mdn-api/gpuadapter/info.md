---
title: "GPUAdapter: info property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpuadapter/info/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPUAdapter: info property

The **`info`** read-only property of the
`GPUAdapter` interface returns a `GPUAdapterInfo` object containing identifying information about the adapter.

## Value

A `GPUAdapterInfo` object instance.

## Examples

### Basic info usage

```js
const adapter = await navigator.gpu.requestAdapter();
if (!adapter) {
  throw Error("Couldn't request WebGPU adapter.");
}

const adapterInfo = adapter.info;
console.log(adapterInfo.vendor);
console.log(adapterInfo.architecture);
```

## See also

- The WebGPU API
