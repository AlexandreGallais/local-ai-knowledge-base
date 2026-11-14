---
title: "Gamepad: vibrationActuator property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gamepad/vibrationactuator/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Gamepad: vibrationActuator property

The **`vibrationActuator`** read-only property of the `Gamepad` interface returns a `GamepadHapticActuator` object, which represents haptic feedback hardware available on the controller.

> **Note:**
> Support for this property may vary across different combinations of platforms and controllers. Even if the controller supports haptic feedback, the platform may not support it.

## Value

A `GamepadHapticActuator` object.

## Examples

```js
const gamepad = navigator.getGamepads()[0];

gamepad.vibrationActuator.playEffect("dual-rumble", {
  startDelay: 0,
  duration: 200,
  weakMagnitude: 1.0,
  strongMagnitude: 1.0,
});
```

## See also

- Gamepad API
