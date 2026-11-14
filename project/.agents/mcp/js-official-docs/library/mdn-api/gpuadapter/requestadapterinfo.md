---
title: "GPUAdapter: requestAdapterInfo() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpuadapter/requestadapterinfo/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPUAdapter: requestAdapterInfo() method

The **`requestAdapterInfo()`** method of the
`GPUAdapter` interface returns a `Promise` that fulfills with a `GPUAdapterInfo` object containing identifying information about an adapter.

`requestAdapterInfo()` has been removed from the WebGPU specification. Use `GPUAdapter.info` to access adapter information instead.

## Syntax

```js
requestAdapterInfo()
```

### Parameters

None.

### Return value

A `Promise` that fulfills with a `GPUAdapterInfo` object instance.

## Examples

```js
async function init() {
  if (!navigator.gpu) {
    throw Error("WebGPU not supported.");
  }

  const adapter = await navigator.gpu.requestAdapter();
  if (!adapter) {
    throw Error("Couldn't request WebGPU adapter.");
  }

  const adapterInfo = await adapter.requestAdapterInfo();
  console.log(adapterInfo.vendor);
  console.log(adapterInfo.architecture);

  // …
}
```

## Specifications

No longer part of the WebGPU specification.

## See also

- The WebGPU API
