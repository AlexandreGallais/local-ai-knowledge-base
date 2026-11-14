---
title: "GPUAdapter"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpuadapter/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPUAdapter

The **`GPUAdapter`** interface of the `WebGPU API` represents a GPU adapter. From this you can request a `GPUDevice`, adapter info, features, and limits.

A `GPUAdapter` object is requested using the `GPU.requestAdapter()` method.

## Instance properties

- `features` (read-only)
    A `GPUSupportedFeatures` object that describes additional functionality supported by the adapter.
- `info` (read-only)
    A `GPUAdapterInfo` object containing identifying information about the adapter.
- `limits` (read-only)
    A `GPUSupportedLimits` object that describes the limits supported by the adapter.

### Deprecated properties

- `isFallbackAdapter` (read-only) (deprecated) (non-standard)
    A boolean value. Returns `true` if the adapter is a fallback adapter, and `false` if not. This property has been removed from the web platform. Use `GPUAdapterInfo.isFallbackAdapter` instead.

## Instance methods

- `requestAdapterInfo()` (deprecated) (non-standard)
    Returns a `Promise` that fulfills with a `GPUAdapterInfo` object containing identifying information about the adapter.
- `requestDevice()`
    Returns a `Promise` that fulfills with a `GPUDevice` object, which is the primary interface for communicating with the GPU.

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

  const device = await adapter.requestDevice();

  // …
}
```

## See also

- The WebGPU API
