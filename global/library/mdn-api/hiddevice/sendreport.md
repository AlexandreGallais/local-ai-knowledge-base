---
title: "HIDDevice: sendReport() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/hiddevice/sendreport/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HIDDevice: sendReport() method

The **`sendReport()`** method of the `HIDDevice` interface sends an output report to the HID device.

The `reportId` for each of the report formats that this device supports can be retrieved from `HIDDevice.collections`.

## Syntax

```js
sendReport(reportId, data)
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

The example below shows how to make a Joy-Con device rumble using output reports. You can see more examples, and live demos in the article Connecting to uncommon HID devices.

```js
// First, send a command to enable vibration.
// Magical bytes come from https://github.com/mzyy94/joycon-toolweb
const enableVibrationData = [1, 0, 1, 64, 64, 0, 1, 64, 64, 0x48, 0x01];
await device.sendReport(0x01, new Uint8Array(enableVibrationData));

// Then, send a command to make the Joy-Con device rumble.
// Actual bytes are available in the sample.
const rumbleData = [/* … */];
await device.sendReport(0x10, new Uint8Array(rumbleData));
```
