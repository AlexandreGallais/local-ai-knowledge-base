---
title: "HIDDevice: sendFeatureReport() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/hiddevice/sendfeaturereport/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HIDDevice: sendFeatureReport() method

The **`sendFeatureReport()`** method of the `HIDDevice` interface sends a feature report to the HID device. Feature reports are a way for HID devices and applications to exchange non-standardized HID data.

The `reportId` for each of the report formats that this device supports can be retrieved from `HIDDevice.collections`.

## Syntax

```js
sendFeatureReport(reportId, data)
```

### Parameters

- `reportId`
    An 8-bit report ID. If the HID device does not use report IDs, send `0`.
- `data`
    Bytes as an `ArrayBuffer`, a `TypedArray`, or a `DataView`.

### Return value

A `Promise` that resolves with `undefined` once the report has been sent.

### Exceptions

- `NotAllowedError` `DOMException`
    Thrown if sending the report fails for any reason.

## Examples

In the following example `sendFeatureReport()` makes a device blink. You can see more examples and live demos in the article Connecting to uncommon HID devices.

```js
const reportId = 1;
for (let i = 0; i < 10; i++) {
  // Turn off
  await device.sendFeatureReport(reportId, Uint32Array.from([0, 0]));
  await new Promise((resolve) => setTimeout(resolve, 100));
  // Turn on
  await device.sendFeatureReport(reportId, Uint32Array.from([512, 0]));
  await new Promise((resolve) => setTimeout(resolve, 100));
}
```
