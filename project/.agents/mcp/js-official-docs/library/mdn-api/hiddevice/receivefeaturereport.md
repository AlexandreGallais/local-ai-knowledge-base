---
title: "HIDDevice: receiveFeatureReport() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/hiddevice/receivefeaturereport/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HIDDevice: receiveFeatureReport() method

The **`receiveFeatureReport()`** method of the `HIDDevice` interface receives a feature report from the HID device. Feature reports are a way for HID devices and applications to exchange non-standardized HID data.

The `reportId` for each of the report formats that this device supports can be retrieved from `HIDDevice.collections`.

## Syntax

```js
receiveFeatureReport(reportId)
```

### Parameters

- `reportId`
    An 8-bit report ID. If the HID device does not use report IDs, send `0`.

### Return value

A `Promise` which resolves with a `DataView` object containing the feature report.

### Exceptions

- `NotAllowedError` `DOMException`
    Thrown if receiving the report fails for any reason.

## Examples

In the following example a report is received from a device using a `reportId` of `1`.

```js
const dataView = await device.receiveFeatureReport(1);
```
