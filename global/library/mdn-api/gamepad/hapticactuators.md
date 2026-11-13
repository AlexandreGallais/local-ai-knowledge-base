---
title: "Gamepad: hapticActuators property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gamepad/hapticactuators/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Gamepad: hapticActuators property

The **`hapticActuators`** read-only property of the `Gamepad` interface returns an array containing `GamepadHapticActuator` objects, each of which represents haptic feedback hardware available on the controller.

## Value

An array containing `GamepadHapticActuator` objects.

## Examples

```js
const gamepad = navigator.getGamepads()[0];

gamepad.hapticActuators[0].pulse(1.0, 200);
```

## See also

- Gamepad API
