---
title: "USBIsochronousInTransferResult"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/usbisochronousintransferresult/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# USBIsochronousInTransferResult

The `USBIsochronousInTransferResult` interface of the WebUSB API provides the result from a call to the `isochronousTransferIn()` method of the `USBDevice` interface. It represents the result from requesting a transfer of data from the USB device to the USB host.

## Constructor

- `USBIsochronousInTransferResult()` (experimental)
    Creates a new `USBIsochronousInTransferResult` object with the provided `packets` and `data` fields.

## Instance properties

- `USBIsochronousInTransferResult.data` (read-only) (experimental)
    Returns a `DataView` object containing the data received from the device. This is the combined data from all packets. See the individual `DataView` objects in the `packets` array for the portion of this buffer containing data from each packet.
- `USBIsochronousInTransferResult.packets` (read-only) (experimental)
    Returns an array of `USBIsochronousInTransferPacket` objects containing the result of each request to receive a packet from the device.
