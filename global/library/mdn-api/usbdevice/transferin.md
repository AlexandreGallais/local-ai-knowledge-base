---
title: "USBDevice: transferIn() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/usbdevice/transferin/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# USBDevice: transferIn() method

The **`transferIn()`** method of the `USBDevice`
interface returns a `Promise` that resolves with a
`USBInTransferResult` when bulk or interrupt data is received from the USB
device.

## Syntax

```js
transferIn(endpointNumber, length)
```

### Parameters

- `endpointNumber`
    The number of a device-specific endpoint (buffer).
- `length`
    The maximum number of bytes that will be read back from the device. The actual data
    is in the `USBInTransferResult` in the resolved Promise.

### Return value

A `Promise` that resolves with a `USBInTransferResult`.
