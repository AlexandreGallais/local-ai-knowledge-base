---
title: "GPUDeviceLostInfo"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpudevicelostinfo/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPUDeviceLostInfo

The **`GPUDeviceLostInfo`** interface of the `WebGPU API` represents the object returned when the `GPUDevice.lost` `Promise` resolves. This provides information as to why a device has been lost.

See the `GPUDevice.lost` page for more information about "lost" state.

## Instance properties

- `message` (read-only)
    A string providing a human-readable message that explains why the device was lost.
- `reason` (read-only)
    An enumerated value that defines the reason the device was lost in a machine-readable way.

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

  // Create a GPUDevice
  let device = await adapter.requestDevice(descriptor);

  // Use lost to handle lost devices
  device.lost.then((info) => {
    console.error(`WebGPU device was lost: ${info.message}`);
    device = null;
    if (info.reason !== "destroyed") {
      init();
    }
  });
  // …
}
```

## See also

- The WebGPU API
