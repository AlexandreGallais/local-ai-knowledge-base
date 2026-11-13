---
title: "GPUAdapterInfo: isFallbackAdapter property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpuadapterinfo/isfallbackadapter/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPUAdapterInfo: isFallbackAdapter property

The **`isFallbackAdapter`** read-only property of the
`GPUAdapterInfo` interface returns `true` if the adapter is a fallback adapter, and `false` if not.

## Value

A boolean.

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

  const isFallback = adapter.info.isFallbackAdapter;
  console.log(isFallback);

  // …
}
```

## See also

- The WebGPU API
