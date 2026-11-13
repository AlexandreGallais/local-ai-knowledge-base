---
title: "GPUDevice: features property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpudevice/features/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPUDevice: features property

The **`features`** read-only property of the
`GPUDevice` interface returns a `GPUSupportedFeatures` object that describes additional functionality supported by the device. Only features requested during the creation of the device (i.e., when `GPUAdapter.requestDevice()` is called) are included.

> **Note:**
> Not all features will be available to WebGPU in all browsers that support it, even if the features are supported by the underlying hardware. See `GPUAdapter.features` for more details.

## Value

A `GPUSupportedFeatures` object instance. This is a setlike object.

## Examples

In the following code we check whether a `GPUAdapter` has the `texture-compression-astc` feature available. If so, we push it into the array of `requiredFeatures`, and request a device with that feature requirement using `GPUAdapter.requestDevice()`.

We then log all items in the `GPUDevice.features` set to the console. This set should only contain a single item — `texture-compression-astc` — as that was the only feature requested when the device was created.

```js
async function init() {
  if (!navigator.gpu) {
    throw Error("WebGPU not supported.");
  }

  const adapter = await navigator.gpu.requestAdapter();
  if (!adapter) {
    throw Error("Couldn't request WebGPU adapter.");
  }

  const requiredFeatures = [];

  if (adapter.features.has("texture-compression-astc")) {
    requiredFeatures.push("texture-compression-astc");
  }

  const device = await adapter.requestDevice({
    requiredFeatures,
  });

  device.features.forEach((value) => {
    console.log(value);
  });

  // …
}
```

## See also

- The WebGPU API
