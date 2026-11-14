---
title: "GamepadHapticActuator: type property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gamepadhapticactuator/type/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GamepadHapticActuator: type property

The **`type`** read-only property of the `GamepadHapticActuator` interface returns an enumerated value representing the type of the haptic hardware.

This property is deprecated: use `GamepadHapticActuator.effects` to detect effect support.

## Value

An enumerated value representing the haptic hardware type. Currently available types are:

- `"vibration"`
    Simple vibration hardware, which creates a rumbling effect.
- `"dual-rumble"`
    A controller with a vibration motor in each handle. Each motor can be vibrated independently to create positional rumbling effects.

## Examples

```js
const gamepad = navigator.getGamepads()[0];

// Logs "vibration" or "dual-rumble"
console.log(gamepad.hapticActuators[0].type);
```

## See also

- Gamepad API
