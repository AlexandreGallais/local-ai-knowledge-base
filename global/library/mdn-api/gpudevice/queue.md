---
title: "GPUDevice: queue property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpudevice/queue/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPUDevice: queue property

The **`queue`** read-only property of the
`GPUDevice` interface returns the primary `GPUQueue` for the device.

## Value

A `GPUQueue` object instance.

## Examples

Basic `GPUQueue` access:

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

  // …

  // Common queue use — end current frame by passing array of
  // command buffers to queue for execution
  device.queue.submit([commandEncoder.finish()]);

  // …
}
```

> **Note:**
> For more queue examples, see the `GPUQueue` reference pages.

## See also

- The WebGPU API
