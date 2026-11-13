---
title: "DevicePosture: type property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/deviceposture/type/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DevicePosture: type property

The **`type`** read-only property of the `DevicePosture` interface returns the device's current posture.

## Value

A string representing the device's current posture. The value can be one of:

- `continuous`
    Indicates a flat screen posture — this can include a foldable device while it is being used flat, a seamless curved display, or a standard desktop, laptop, tablet or mobile screen.
- `folded`
    Indicates a folded screen posture — this can include a foldable device being used in a book or laptop posture.

## Examples

```js
const postureOutput = document.getElementById("currentPosture");

function reportPostureOutput() {
  // type property returns "continuous" or "folded"
  postureOutput.textContent = `Device posture: ${navigator.devicePosture.type}`;
}

navigator.devicePosture.addEventListener("change", reportPostureOutput);
```

## See also

- CSS `device-posture` `@media` feature
- Device Posture API
- Origin trial for Foldable APIs on developer.chrome.com (2024)
