---
title: "HID"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/hid/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HID

The **`HID`** interface provides methods for connecting to _HID devices_, listing attached HID devices and event handlers for connected HID devices.

## Instance properties

_This interface also inherits properties of its parent, `EventTarget`._

## Instance methods

_This interface also inherits methods of its parent, `EventTarget`._

- `getDevices()` (experimental)
    Returns a `Promise` that resolves with an array of connected HID devices that the user has previously been granted access to in response to a `requestDevice()` call.
- `requestDevice()` (experimental)
    Returns a `Promise` that resolves with an array of connected `HIDDevice` objects. Calling this function will trigger the user agent's permission flow in order to gain permission to access one selected device from the returned list of devices.

### Events

- `connect` (experimental)
    Fired when an HID device is connected.
- `disconnect` (experimental)
    Fired when an HID device is disconnected.

## See also

- WebHID API
