---
title: "GamepadHapticActuator: effects property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gamepadhapticactuator/effects/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GamepadHapticActuator: effects property

The **`effects`** read-only property of the `GamepadHapticActuator` interface returns an array of enumerated values representing the different haptic effects that the actuator supports.

## Value

An array representing the supported haptic effects. Possible included values are:

- `"dual-rumble"`
    A positional rumbling effect created by dual vibration motors in each handle of a controller, which can be vibrated independently.
- `"trigger-rumble"`
    Localized rumbling effects on the surface of a controller's trigger buttons created by vibrational motors located in each button. These buttons most commonly take the form of spring-loaded triggers.

> **Note:**
> If an effect is not listed that is known to be supported by the hardware, it may be that the browser does not support playing effects of that type.

## Examples

```js
const gamepad = navigator.getGamepads()[0];

// Logs "dual-rumble" or "trigger-rumble"
console.log(gamepad.hapticActuators[0].effects[0]);
```

## See also

- Gamepad API
