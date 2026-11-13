---
title: "USBDevice: controlTransferOut() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/usbdevice/controltransferout/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# USBDevice: controlTransferOut() method

The **`controlTransferOut()`** method of the `USBDevice` interface returns a `Promise` that resolves with a `USBOutTransferResult` when a command or status operation has been transmitted from the USB device.

## Syntax

```js
controlTransferOut(setup, data)
```

### Parameters

- `setup`
    An object that sets options for. The available options are:
    - `requestType`
        Must be one of three values specifying whether the transfer is `"standard"` (common to all USB devices) `"class"` (common to an industry-standard class of devices) or `"vendor"`.
    - `recipient`
        Specifies the target of the transfer on the device, one of `"device"`, `"interface"`, `"endpoint"`, or `"other"`.
    - `request`
        A vendor-specific command.
    - `value`
        Vendor-specific request parameters.
    - `index`
        The interface number of the recipient.

- `data`
    A `TypedArray` containing the data that will be transferred to the device.
    Not all commands require data; some commands can send data just through the value parameter.
    Check with your device to see what the specific request requires.

### Return value

A `Promise` that resolves with a `USBOutTransferResult`.
