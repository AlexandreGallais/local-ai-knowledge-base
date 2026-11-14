---
title: "USBDevice"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/usbdevice/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# USBDevice

The **`USBDevice`** interface of the WebUSB API provides access to metadata about a paired USB device and methods for controlling it.

## Instance properties

- `USBDevice.configuration` (read-only) (experimental)
    A `USBConfiguration` object for the currently selected interface for a paired USB device.
- `USBDevice.configurations` (read-only) (experimental)
    An `Array` of device-specific interfaces for controlling a paired USB device.
- `USBDevice.deviceClass` (read-only) (experimental)
    One of three properties that identify USB devices for the purpose of loading a USB driver that will work with that device. The other two properties are `USBDevice.deviceSubclass` and `USBDevice.deviceProtocol`.
- `USBDevice.deviceProtocol` (read-only) (experimental)
    One of three properties that identify USB devices for the purpose of loading a USB driver that will work with that device. The other two properties are `USBDevice.deviceClass` and `USBDevice.deviceSubclass`.
- `USBDevice.deviceSubclass` (read-only) (experimental)
    One of three properties that identify USB devices for the purpose of loading a USB driver that will work with that device. The other two properties are `USBDevice.deviceClass` and `USBDevice.deviceProtocol`.
- `USBDevice.deviceVersionMajor` (read-only) (experimental)
    The major version number of the device in a semantic versioning scheme.
- `USBDevice.deviceVersionMinor` (read-only) (experimental)
    The minor version number of the device in a semantic versioning scheme.
- `USBDevice.deviceVersionSubminor` (read-only) (experimental)
    The patch version number of the device in a semantic versioning scheme.
- `USBDevice.manufacturerName` (read-only) (experimental)
    The name of the organization that manufactured the USB device.
- `USBDevice.opened` (read-only) (experimental)
    Indicates whether a session has been started with a paired USB device.
- `USBDevice.productId` (read-only) (experimental)
    The manufacturer-defined code that identifies a USB device.
- `USBDevice.productName` (read-only) (experimental)
    The manufacturer-defined name that identifies a USB device.
- `USBDevice.serialNumber` (read-only) (experimental)
    The manufacturer-defined serial number for the specific USB device.
- `USBDevice.usbVersionMajor` (read-only) (experimental)
    One of three properties that declare the USB protocol version supported by the device. The other two properties are `USBDevice.usbVersionMinor` and `USBDevice.usbVersionSubminor`.
- `USBDevice.usbVersionMinor` (read-only) (experimental)
    One of three properties that declare the USB protocol version supported by the device. The other two properties are `USBDevice.usbVersionMajor` and `USBDevice.usbVersionSubminor`.
- `USBDevice.usbVersionSubminor` (read-only) (experimental)
    One of three properties that declare the USB protocol version supported by the device. The other two properties are `USBDevice.usbVersionMajor` and `USBDevice.usbVersionMinor`.
- `USBDevice.vendorId` (read-only) (experimental)
    The official usb.org-assigned vendor ID.

## Instance methods

- `USBDevice.claimInterface()` (experimental)
    Returns a `Promise` that resolves when the requested interface is claimed for exclusive access.
- `USBDevice.clearHalt()` (experimental)
    Returns a `Promise` that resolves when a halt condition is cleared.
- `USBDevice.controlTransferIn()` (experimental)
    Returns a `Promise` that resolves with a `USBInTransferResult` when a command or status operation has been transmitted to the USB device.
- `USBDevice.controlTransferOut()` (experimental)
    Returns a `Promise` that resolves with a `USBOutTransferResult` when a command or status operation has been transmitted from the USB device.
- `USBDevice.close()` (experimental)
    Returns a `Promise` that resolves when all open interfaces are released and the device session has ended.
- `USBDevice.forget()` (experimental)
    Returns a `Promise` that resolves after all open interfaces are released, the device session has ended, and the permission is reset.
- `USBDevice.isochronousTransferIn()` (experimental)
    Returns a `Promise` that resolves with a `USBIsochronousInTransferResult` when time sensitive information has been transmitted to the USB device.
- `USBDevice.isochronousTransferOut()` (experimental)
    Returns a `Promise` that resolves with a `USBIsochronousOutTransferResult` when time sensitive information has been transmitted from the USB device.
- `USBDevice.open()` (experimental)
    Returns a `Promise` that resolves when a device session has started.
- `USBDevice.releaseInterface()` (experimental)
    Returns a `Promise` that resolves when a claimed interface is released from exclusive access.
- `USBDevice.reset()` (experimental)
    Returns a `Promise` that resolves when the device is reset and all app operations canceled and their promises rejected.
- `USBDevice.selectAlternateInterface()` (experimental)
    Returns a `Promise` that resolves when the specified alternative endpoint is selected.
- `USBDevice.selectConfiguration()` (experimental)
    Returns a `Promise` that resolves when the specified configuration is selected.
- `USBDevice.transferIn()` (experimental)
    Returns a `Promise` that resolves with a `USBInTransferResult` when bulk or interrupt data is received from the USB device.
- `USBDevice.transferOut()` (experimental)
    Returns a `Promise` that resolves with a `USBOutTransferResult` when bulk or interrupt data is sent to the USB device.
