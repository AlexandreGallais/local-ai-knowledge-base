---
title: "USBOutTransferResult"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/usbouttransferresult/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# USBOutTransferResult

The `USBOutTransferResult` interface of the WebUSB API provides the result from a call to the `transferOut()` and `controlTransferOut()` methods of the `USBDevice` interface. It represents the result from requesting a transfer of data from the USB host to the USB device.

## Constructor

- `USBOutTransferResult()` (experimental)
    Creates a new `USBOutTransferResult` object with the provided `status` and `bytesWritten` fields.

## Instance properties

- `USBOutTransferResult.bytesWritten` (read-only) (experimental)
    Returns the number of bytes from the transfer request that were sent to the device.
- `USBOutTransferResult.status` (read-only) (experimental)
    Returns the status of the transfer request, one of:
    - `"ok"` - The transfer was successful.
    - `"stall"` - The device indicated an error by generating a stall condition on the endpoint. A stall on a bulk or interrupt endpoint must be cleared by calling `clearHalt()` before `transferOut()` can be called again.
