---
title: "HIDInputReportEvent"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/hidinputreportevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HIDInputReportEvent

The **`HIDInputReportEvent`** interface of the WebHID API is passed to `inputreport` event of `HIDDevice` when an input report is received from any associated HID device.

## Instance properties

_This interface also inherits properties from `Event`._

- `HIDInputReportEvent.data` (read-only) (experimental)
    A `DataView` containing the data from the input report, excluding the `reportId` if the HID interface uses report IDs.
- `HIDInputReportEvent.device` (read-only) (experimental)
    The `HIDDevice` instance that represents the HID interface that sent the input report.
- `HIDInputReportEvent.reportId` (read-only) (experimental)
    The one-byte identification prefix for this report, or 0 if the HID interface does not use report IDs.

## Instance methods

_This interface inherits methods from its parent, `Event`._

## Examples

The following example demonstrates listening for an `inputReport` that will allow the application to detect which button is pressed on a Joy-Con Right device. You can see more examples, and live demos in the article Connecting to uncommon HID devices.

```js
device.addEventListener("inputreport", (event) => {
  const { data, device, reportId } = event;

  // Handle only the Joy-Con Right device and a specific report ID.
  if (device.productId !== 0x2007 && reportId !== 0x3f) return;

  const value = data.getUint8(0);
  if (value === 0) return;

  const someButtons = { 1: "A", 2: "X", 4: "B", 8: "Y" };
  console.log(`User pressed button ${someButtons[value]}.`);
});
```
