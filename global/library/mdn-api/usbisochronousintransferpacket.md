---
title: "USBIsochronousInTransferPacket"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/usbisochronousintransferpacket/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# USBIsochronousInTransferPacket

The `USBIsochronousInTransferPacket` interface of the WebUSB API is part of the response from a call to the `isochronousTransferIn()` method of the `USBDevice` interface. It represents the status of an individual packet from a request to transfer data from the USB device to the USB host over an isochronous endpoint.

## Constructor

- `USBIsochronousInTransferPacket()` (experimental)
    Creates a new `USBIsochronousInTransferPacket` object with the provided `status` and `data` fields.

## Instance properties

- `USBIsochronousInTransferPacket.data` (read-only) (read-only) (experimental)
    Returns a `DataView` object containing the data received from the USB device in this packet, if any.
- `USBIsochronousInTransferPacket.status` (read-only) (read-only) (experimental)
    Returns the status of the transfer request, one of:
    - `"ok"` - The transfer was successful.
    - `"stall"` - The device indicated an error by generating a stall condition on the endpoint. A stall on an isochronous endpoint does not need to be cleared.
    - `"babble"` - The device responded with more data than was expected.
