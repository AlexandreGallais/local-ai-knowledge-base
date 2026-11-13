---
title: "GPUDevice: limits property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpudevice/limits/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPUDevice: limits property

The **`limits`** read-only property of the
`GPUDevice` interface returns a `GPUSupportedLimits` object that describes the limits supported by the device. All limit values will be included, and the limits requested during the creation of the device (i.e., when `GPUAdapter.requestDevice()` is called) will be reflected in those values.

> **Note:**
> Not all limits will be reported as expected, even if they are supported by the underlying hardware. See `GPUAdapter.limits` for more details.

## Value

A `GPUSupportedLimits` object instance.

## Examples

In the following code we query the `GPUAdapter.limits` value of `maxBindGroups` to see if it is equal to or greater than 6. Our theoretical example app ideally needs 6 bind groups, so if the returned value is >= 6, we add a maximum limit of 6 to the `requiredLimits` object.

We then check that the expected limit has been set on the resulting device by logging its value to the console.

```js
async function init() {
  if (!navigator.gpu) {
    throw Error("WebGPU not supported.");
  }

  const adapter = await navigator.gpu.requestAdapter();
  if (!adapter) {
    throw Error("Couldn't request WebGPU adapter.");
  }

  const requiredLimits = {};

  // App ideally needs 6 bind groups, so we'll try to request what the app needs
  if (adapter.limits.maxBindGroups >= 6) {
    requiredLimits.maxBindGroups = 6;
  }

  const device = await adapter.requestDevice({
    requiredLimits,
  });

  console.log(device.limits.maxBindGroups);

  // …
}
```

## See also

- The WebGPU API
