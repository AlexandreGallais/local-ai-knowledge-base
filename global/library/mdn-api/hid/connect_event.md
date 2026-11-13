---
title: "HID: connect event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/hid/connect_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HID: connect event

The **`connect`** event of the `HID` interface fires when the user agent connects to a HID device.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("connect", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onconnect = (event) => { }
```

## Event type

A `HIDConnectionEvent`. Inherits from `Event`.

## Examples

In the following example an event listener is registered to listen for the connection of a device. The name of the device is then printed to the console using `HIDDevice.productName`.

```js
navigator.hid.addEventListener("connect", ({ device }) => {
  console.log(`HID connected: ${device.productName}`);
});
```
