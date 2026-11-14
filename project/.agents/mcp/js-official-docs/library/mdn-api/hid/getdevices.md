---
title: "HID: getDevices() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/hid/getdevices/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HID: getDevices() method

The **`getDevices()`** method of the `HID` interface gets a list of connected HID devices that the user has previously been granted access to in response to a `requestDevice()` call.

## Syntax

```js
getDevices()
```

### Parameters

None.

### Return value

A `Promise` that resolves with a list of `HIDDevice` objects.

## Examples

The following example gets a list of devices and logs the device names to the console.

```js
let devices = await navigator.hid.getDevices();
devices.forEach((device) => {
  console.log(`HID: ${device.productName}`);
});
```
