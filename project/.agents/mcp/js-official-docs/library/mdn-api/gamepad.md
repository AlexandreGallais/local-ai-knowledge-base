---
title: "Gamepad"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gamepad/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Gamepad

The **`Gamepad`** interface of the Gamepad API defines an individual gamepad or other controller, allowing access to information such as button presses, axis positions, and id.

A Gamepad object can be returned in one of two ways: via the `gamepad` property of the `gamepadconnected` and `gamepaddisconnected` events, or by grabbing any position in the array returned by the `Navigator.getGamepads()` method.

> **Note:**
> The support of gamepad features varies across different combinations of platforms and controllers. Even if the controller supports a certain feature (for example, haptic feedback), the platform may not support it for that controller.

## Instance properties

- `Gamepad.axes` (read-only)
    An array representing the controls with axes present on the device (e.g., analog thumb sticks).
- `Gamepad.buttons` (read-only)
    An array of `gamepadButton` objects representing the buttons present on the device.
- `Gamepad.connected` (read-only)
    A boolean indicating whether the gamepad is still connected to the system.
- `Gamepad.displayId` (read-only) (deprecated) (non-standard)
    Returns the `VRDisplay.displayId` of an associated `VRDisplay` (if relevant) — the `VRDisplay` that the gamepad is controlling the displayed scene of.
- `Gamepad.hand` (read-only) (experimental)
    An enum defining what hand the controller is being held in, or is most likely to be held in.
- `Gamepad.hapticActuators` (read-only) (experimental)
    An array containing `GamepadHapticActuator` objects, each of which represents haptic feedback hardware available on the controller.
- `Gamepad.vibrationActuator` (read-only)
    A `GamepadHapticActuator` object, which represents haptic feedback hardware available on the controller.
- `Gamepad.id` (read-only)
    A string containing identifying information about the controller.
- `Gamepad.index` (read-only)
    An integer that is auto-incremented to be unique for each device currently connected to the system.
- `Gamepad.mapping` (read-only)
    A string indicating whether the browser has remapped the controls on the device to a known layout.
- `Gamepad.pose` (read-only) (experimental)
    A `GamepadPose` object representing the pose information associated with a WebVR controller (e.g., its position and orientation in 3D space).
- `Gamepad.timestamp` (read-only)
    A `DOMHighResTimeStamp` representing the last time the data for this gamepad was updated.

## Example

```js
window.addEventListener("gamepadconnected", (e) => {
  console.log(
    "Gamepad connected at index %d: %s. %d buttons, %d axes.",
    e.gamepad.index,
    e.gamepad.id,
    e.gamepad.buttons.length,
    e.gamepad.axes.length,
  );
});
```

## See also

- Using the Gamepad API
- Gamepad API
