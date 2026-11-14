---
title: "GPUAdapter: requestDevice() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpuadapter/requestdevice/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPUAdapter: requestDevice() method

The **`requestDevice()`** method of the
`GPUAdapter` interface returns a `Promise` that fulfills with a `GPUDevice` object, which is the primary interface for communicating with the GPU.

## Syntax

```js
requestDevice()
requestDevice(descriptor)
```

### Parameters

- `descriptor` (optional)
    An object containing the following properties:
    - `defaultQueue` (optional)
        An object that provides information for the device's default `GPUQueue` (as returned by `GPUDevice.queue`). This object has a single property — `label` — which provides the default queue with a `label` value. If no value is provided, this defaults to an empty object, and the default queue's label will be an empty string.
    - `label` (optional)
        A string providing a label that can be used to identify the `GPUDevice`, for example in `GPUError` messages or console warnings.
    - `requiredFeatures` (optional)
        An array of strings representing additional functionality that you want supported by the returned `GPUDevice`. The `requestDevice()` call will fail if the `GPUAdapter` cannot provide these features. See `GPUSupportedFeatures` for a full list of possible features. This defaults to an empty array if no value is provided.
    - `requiredLimits` (optional)
        An object containing properties representing the limits that you want supported by the returned `GPUDevice`. The `requestDevice()` call will fail if the `GPUAdapter` cannot provide these limits. Each key with a non-`undefined` value must be the name of a member of `GPUSupportedLimits`.
        > **Note:**
        > You can request unknown limits when requesting a GPU device without causing an error. Such limits will be `undefined`. This is useful because it makes WebGPU code less brittle — a codebase won't stop working because a limit no longer exists in the adapter.

Not all features and limits will be available to WebGPU in all browsers that support it, even if they are supported by the underlying hardware. See the `features` and `limits` pages for more information.

### Return value

A `Promise` that fulfills with a `GPUDevice` object instance.

If you make a duplicate call, i.e., call `requestDevice()` on a `GPUAdapter` that `requestDevice()` was already called on, the promise rejects with an `OperationError` because the associated `GPUAdapter` is consumed when a `GPUDevice` is created.

### Exceptions

- `OperationError` `DOMException`
    The promise rejects with an `OperationError` if either:
    - The limits included in the `requiredLimits` property are not supported by the `GPUAdapter`, either because they are not valid limits, or because their values are higher than the adapter's values for those limits.
    - The `GPUAdapter` has been consumed by having `requestDevice()` called on it previously.
- `TypeError`
    The promise rejects with a `TypeError` if the features included in the `requiredFeatures` property are not supported by the `GPUAdapter`.

## Examples

### Basic <example-value>

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

### Requesting specific features and limits

In the following code we:

1. Check whether a `GPUAdapter` has the `texture-compression-astc` feature available. If so, we push it into the array of `requiredFeatures`.
2. Query the `GPUAdapter.limits` value of `maxBindGroups` to see if it is equal to or greater than 6. Our theoretical example app ideally needs 6 bind groups, so if the returned value is >= 6, we add a maximum limit of 6 to the `requiredLimits` object.
3. Request a device with those feature and limit requirements, plus a `defaultQueue` label.

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

  const requiredLimits = {};

  // App ideally needs 6 bind groups, so we'll try to request what the app needs
  if (adapter.limits.maxBindGroups >= 6) {
    requiredLimits.maxBindGroups = 6;
  }

  const device = await adapter.requestDevice({
    defaultQueue: {
      label: "my_queue",
    },
    requiredFeatures,
    requiredLimits,
  });

  // …
}
```

## See also

- The WebGPU API
