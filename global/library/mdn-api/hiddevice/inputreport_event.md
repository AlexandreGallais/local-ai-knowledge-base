---
title: "HIDDevice: inputreport event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/hiddevice/inputreport_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HIDDevice: inputreport event

The **`inputreport`** event of the `HIDDevice` interface fires when a new report is received from the HID device.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("inputreport", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
oninputreport = (event) => { }
```

## Event type

An `HIDInputReportEvent`. Inherits from `Event`.

## Example

The following example demonstrates listening for an `inputreport` event that will allow the application to detect which button is pressed on a Joy-Con Right device. You can see more examples, and live demos in the article Connecting to uncommon HID devices.

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
