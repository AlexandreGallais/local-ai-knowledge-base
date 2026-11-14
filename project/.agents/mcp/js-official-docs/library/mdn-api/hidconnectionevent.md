---
title: "HIDConnectionEvent"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/hidconnectionevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HIDConnectionEvent

The **`HIDConnectionEvent`** interface of the WebHID API represents HID connection events, and is the event type passed to `connect` and `disconnect` event handlers when a device's connection state changes.

## Constructor

- `HIDConnectionEvent()` (experimental)
    Returns a new `HIDConnectionEvent` object. Typically this constructor is not used as events are created when a device's connection state changes.

## Instance properties

_This interface also inherits properties from `Event`._

- `HIDConnectionEvent.device` (read-only) (experimental)
    Returns the `HIDDevice` instance representing the device associated with the connection event.

## Examples

The following example registers event listeners for `connect` and `disconnect` events, then prints the `HIDDevice.productName` to the console.

```js
navigator.hid.addEventListener("connect", ({ device }) => {
  console.log(`HID connected: ${device.productName}`);
});

navigator.hid.addEventListener("disconnect", ({ device }) => {
  console.log(`HID disconnected: ${device.productName}`);
});
```
