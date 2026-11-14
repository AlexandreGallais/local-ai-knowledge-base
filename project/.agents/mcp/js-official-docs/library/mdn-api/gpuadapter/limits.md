---
title: "GPUAdapter: limits property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpuadapter/limits/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPUAdapter: limits property

The **`limits`** read-only property of the
`GPUAdapter` interface returns a `GPUSupportedLimits` object that describes the limits supported by the adapter.

You should note that, rather than reporting the exact limits of each GPU, browsers will likely report different tier values of different limits to reduce the unique information available to drive-by fingerprinting. For example, the tiers of a certain limit might be 2048, 8192, and 32768. If your GPU's actual limit is 16384, the browser will still report 8192.

Given that different browsers will handle this differently and the tier values may change over time, it is hard to provide an accurate account of what limit values to expect — thorough testing is advised.

## Value

A `GPUSupportedLimits` object instance.

## Examples

In the following code we query the `GPUAdapter.limits` value of `maxBindGroups` to see if it is equal to or greater than 6. Our theoretical example app ideally needs 6 bind groups, so if the returned value is >= 6, we add a maximum limit of 6 to the `requiredLimits` object, and request a device with that limit requirement using `GPUAdapter.requestDevice()`:

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

  // …
}
```

## See also

- The WebGPU API
