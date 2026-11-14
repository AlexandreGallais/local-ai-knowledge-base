---
title: "USBAlternateInterface"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/usbalternateinterface/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# USBAlternateInterface

The `USBAlternateInterface` interface of the WebUSB API provides information about a particular configuration of an interface provided by the USB device. An interface includes one or more alternate settings which can configure a set of endpoints based on the operating mode of the device.

## Constructor

- `USBAlternateInterface()` (experimental)
    Creates a new `USBAlternateInterface` object which will be populated with information about the alternate interface of the provided `USBInterface` with the given alternate setting number.

## Instance properties

- `USBAlternateInterface.alternateSetting` (read-only) (experimental)
    Returns the alternate setting number of this interface. This is equal to the `bAlternateSetting` field of the interface descriptor defining this interface.
- `USBAlternateInterface.interfaceClass` (read-only) (experimental)
    Returns the class of this interface. This is equal to the `bInterfaceClass` field of the interface descriptor defining this interface. Standardized values for this field are defined by the USB Implementers Forum. A value of `0xFF` indicates a vendor-defined interface.
- `USBAlternateInterface.interfaceSubclass` (read-only) (experimental)
    Returns the subclass of this interface. This is equal to the `bInterfaceSubClass` field of the interface descriptor defining this interface. The meaning of this value depends on the `interfaceClass` field.
- `USBAlternateInterface.interfaceProtocol` (read-only) (experimental)
    Returns the protocol supported by this interface. This is equal to the `bInterfaceProtocol` field of the interface descriptor defining this interface. The meaning of this value depends on the `interfaceClass` and `interfaceSubclass` fields.
- `USBAlternateInterface.interfaceName` (read-only) (experimental)
    Returns the name of the interface, if one is provided by the device. This is the value of the string descriptor with the index specified by the `iInterface` field of the interface descriptor defining this interface.
- `USBAlternateInterface.endpoints` (read-only) (experimental)
    Returns an array containing instances of the `USBEndpoint` interface describing each of the endpoints that are part of this interface.
