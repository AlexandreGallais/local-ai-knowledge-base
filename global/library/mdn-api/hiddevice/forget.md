---
title: "HIDDevice: forget() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/hiddevice/forget/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HIDDevice: forget() method

The **`forget()`** method of the `HIDDevice` interface closes the connection to the HID device and forgets the device.

## Syntax

```js
forget()
```

### Parameters

None.

### Return value

A `Promise` that resolves with `undefined` once the connection is closed, the device is forgotten, and the permission is reset.

## Example

In the following example we connect to a Nintendo Switch Joy-Con Right HID device, blink once, and disconnect from it.

```js
async function blink() {
  const devices = await navigator.hid.requestDevice({
    filters: [
      {
        vendorId: 0x057e, // Nintendo Co., Ltd
        productId: 0x2007, // Joy-Con Right
      },
    ],
  });
  const device = devices[0];
  await device.open();
  // Turn off
  await device.sendFeatureReport(reportId, Uint32Array.from([0, 0]));
  await new Promise((resolve) => setTimeout(resolve, 100));
  // Turn on
  await device.sendFeatureReport(reportId, Uint32Array.from([512, 0]));
  await new Promise((resolve) => setTimeout(resolve, 100));
  // Finally, disconnect from it
  await device.forget();
}
blink();
```
