---
title: "USBConnectionEvent"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/usbconnectionevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# USBConnectionEvent

The **`USBConnectionEvent`** interface of the `WebUSB API` is the event type passed to `USB` `connect` and `disconnect` events when the user agent detects that a new USB device has been connected or disconnected.

## Constructor

- `USBConnectionEvent()` (experimental)
    Returns a `USBConnectionEvent` object.

## Instance properties

- `USBConnectionEvent.device` (read-only) (experimental)
    Returns a `USBDevice` object representing the current device.

## Examples

In the following example listening for connect and disconnect events is used to add and remove the devices from the user interface of an application.

```js
navigator.usb.addEventListener("connect", (event) => {
  // Add event.device to the UI.
});

navigator.usb.addEventListener("disconnect", (event) => {
  // Remove event.device from the UI.
});
```
