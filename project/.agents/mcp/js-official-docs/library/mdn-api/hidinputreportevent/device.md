---
title: "HIDInputReportEvent: device property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/hidinputreportevent/device/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HIDInputReportEvent: device property

The **`device`** property of the `HIDInputReportEvent` interface returns the `HIDDevice` instance that represents the HID interface that sent the input report.

## Value

An `HIDDevice`.

## Examples

In the following example `device` is a `HIDDevice` instance, representing the device sending the report. The `productName` of this device is logged to the console.

```js
device.addEventListener("inputreport", (event) => {
  const { data, device, reportId } = event;
  console.log(device.productName);
});
```
