---
title: "GPUDeviceLostInfo: reason property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpudevicelostinfo/reason/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPUDeviceLostInfo: reason property

The **`reason`** read-only property of the
`GPUDeviceLostInfo` interface defines the reason the device was lost in a machine-readable way.

## Value

An enumerated value. At the moment the only value defined in the spec is `"destroyed"`, which indicates that the device was destroyed by a call to `GPUDevice.destroy()`.

If the device was lost because of an unknown reason not covered in the available enumerated values, `reason` returns `undefined`.

## Examples

See the main `GPUDevice.lost` page for an example.

## See also

- The WebGPU API
