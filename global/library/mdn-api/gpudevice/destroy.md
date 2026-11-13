---
title: "GPUDevice: destroy() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpudevice/destroy/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPUDevice: destroy() method

The **`destroy()`** method of the
`GPUDevice` interface destroys the device, preventing further operations on it.

Note that:

- Any commands currently enqueued on the device's `GPUQueue` will be executed before the device is destroyed.
- Any WebGPU resources created using the device (buffers, textures, etc.) are also destroyed.
- Any mapped buffers created using the device will be unmapped.

## Syntax

```js
destroy()
```

### Parameters

None.

### Return value

None (`undefined`).

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

  let device = await adapter.requestDevice();

  // Some time later

  device.destroy();
}
```

## See also

- The WebGPU API
