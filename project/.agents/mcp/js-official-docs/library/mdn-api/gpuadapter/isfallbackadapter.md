---
title: "GPUAdapter: isFallbackAdapter property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpuadapter/isfallbackadapter/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPUAdapter: isFallbackAdapter property

The **`isFallbackAdapter`** read-only property of the
`GPUAdapter` interface returns `true` if the adapter is a fallback adapter, and `false` if not.

This property has been removed from the web platform. Use `GPUAdapterInfo.isFallbackAdapter` instead.

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

  const isFallback = adapter.isFallbackAdapter;
  console.log(isFallback);

  // …
}
```

## See also

- The WebGPU API
