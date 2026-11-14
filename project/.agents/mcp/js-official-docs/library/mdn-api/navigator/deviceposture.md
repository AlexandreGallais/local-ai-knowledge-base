---
title: "Navigator: devicePosture property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/navigator/deviceposture/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Navigator: devicePosture property

The **`Navigator.devicePosture`** read-only property returns the browser's `DevicePosture` object, which allows developers to query the device's current posture (that is, whether the viewport is in a flat or folded state) and run code in response to posture changes.

## Value

A `DevicePosture` object.

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

- `DevicePosture`
- `devicePosture.type`
- Device Posture API
- CSS `device-posture` `@media` feature
