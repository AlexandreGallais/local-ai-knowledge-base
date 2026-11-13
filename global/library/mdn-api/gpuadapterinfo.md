---
title: "GPUAdapterInfo"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpuadapterinfo/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPUAdapterInfo

The **`GPUAdapterInfo`** interface of the `WebGPU API` contains identifying information about a `GPUAdapter`.

An adapter's `GPUAdapterInfo` can be retrieved using the `GPUAdapter.info` property of the adapter itself, or the `GPUDevice.adapterInfo` property of a device that originated from the adapter.

This object allows developers to access specific details about the user's GPU so that they can preemptively apply workarounds for GPU-specific bugs, or provide different codepaths to better suit different GPU architectures. Providing such information does present a security risk — it could be used for fingerprinting — therefore the information shared is kept at a minimum, and different browser vendors are likely to share different information types and granularities.

## Instance properties

- `architecture` (read-only)
    The name of the family or class of GPUs the adapter belongs to. Returns an empty string if it is not available.
- `description` (read-only)
    A human-readable string describing the adapter. Returns an empty string if it is not available.
- `device` (read-only)
    A vendor-specific identifier for the adapter. Returns an empty string if it is not available.
- `isFallbackAdapter` (read-only)
    A boolean value. Returns `true` if the adapter is a fallback adapter, and `false` if not.
- `subgroupMaxSize` (read-only)
    The maximum supported subgroup size for the `GPUAdapter`.
- `subgroupMinSize` (read-only)
    The minimum supported subgroup size for the `GPUAdapter`.
- `vendor` (read-only)
    The name of the adapter vendor. Returns an empty string if it is not available.

## Examples

### Access GPUAdapterInfo via GPUAdapter.info

```js
const adapter = await navigator.gpu.requestAdapter();
if (!adapter) {
  throw Error("Couldn't request WebGPU adapter.");
}

const adapterInfo = adapter.info;
console.log(adapterInfo.vendor);
console.log(adapterInfo.architecture);
```

### Access GPUAdapterInfo via GPUDevice.adapterInfo

```js
const adapter = await navigator.gpu.requestAdapter();
if (!adapter) {
  throw Error("Couldn't request WebGPU adapter.");
}

const myDevice = await adapter.requestDevice();

function optimizeForGpuDevice(device) {
  if (device.adapterInfo.vendor === "amd") {
    // Use AMD-specific optimizations
  } else if (device.adapterInfo.architecture.includes("turing")) {
    // Optimize for NVIDIA Turing architecture
  }
}

optimizeForGpuDevice(myDevice);
```

## See also

- `GPUAdapter.info`
- The WebGPU API
