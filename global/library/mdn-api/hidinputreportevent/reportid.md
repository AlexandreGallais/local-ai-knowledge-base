---
title: "HIDInputReportEvent: reportId property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/hidinputreportevent/reportid/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HIDInputReportEvent: reportId property

The **`reportId`** property of the `HIDInputReportEvent` interface returns the one-byte identification prefix for this report, or 0 if the HID interface does not use report IDs.

## Value

A one-byte identification prefix.

## Examples

In the following example the `reportId` of an incoming input report is logged to the console.

```js
device.addEventListener("inputreport", (event) => {
  const { data, device, reportId } = event;
  console.log(reportId);
});
```
