---
title: "Gamepad: displayId property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gamepad/displayid/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Gamepad: displayId property

The **`displayId`** read-only property of the `Gamepad` interface _returns the `VRDisplay.displayId` of the associated `VRDisplay` — the `VRDisplay` that the gamepad is controlling the displayed scene of._

A Gamepad is considered to be associated with a `VRDisplay` if it reports a pose that is in the same space as the display's pose, see `VRDisplay.getPose()`.

> **Note:**
> This property was part of the old WebVR API. It has been superseded by the WebXR Gamepads Module.
>
> There is no direct replacement for this property. The `Gamepad` object associated with an `XRInputSource` can be obtained using the `XRInputSource.gamepad` property.

## Value

A number representing the associated `VRDisplay.displayId`. If the number is 0, then the gamepad is not associated with a VR display.

## Examples

```js
window.addEventListener("gamepadconnected", (e) => {
  if (!e.gamepad.displayId) {
    console.log("Gamepad connected");
  } else {
    console.log(
      `Gamepad connected, associated with VR display ${e.gamepad.displayId}`,
    );
  }
});
```

## Specifications

This property was part of the old WebVR API that has been superseded by the WebXR Gamepads Module. It is no longer on track to becoming a standard.

Until all browsers have implemented the new WebXR APIs, it is recommended to rely on frameworks, like A-Frame, Babylon.js, or Three.js, or a polyfill, to develop WebXR applications that will work across all browsers. Read Meta's Porting from WebVR to WebXR guide for more information.

## See also

- WebVR API
