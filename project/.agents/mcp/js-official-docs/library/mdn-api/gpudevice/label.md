---
title: "GPUDevice: label property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpudevice/label/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPUDevice: label property

The **`label`** property of the
`GPUDevice` interface is a string providing a label that can be used to identify the object, for example in `GPUError` messages or console warnings.

## Value

A string. If no label value has previously been set, getting the label returns an empty string.

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
  const device = await adapter.requestDevice();

  // Set a label
  device.label = "my_label";

  // Get a label
  console.log(device.label);

  // …
}
```

## See also

- The WebGPU API
