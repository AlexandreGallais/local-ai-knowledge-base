---
title: "DevicePosture"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/deviceposture/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DevicePosture

The **`DevicePosture`** interface of the `Device Posture API` represents the device's posture, that is, whether the viewport is in a flat or folded state.

## Instance properties

_Inherits properties from its parent, `EventTarget`._

- `type` (read-only) (experimental)
    Returns the device's current posture.

## Events

- `change` (experimental)
    Fires when the device's posture changes.

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
