---
title: "GamepadHapticActuator"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gamepadhapticactuator/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GamepadHapticActuator

The **`GamepadHapticActuator`** interface of the Gamepad API represents hardware in the controller designed to provide haptic feedback to the user (if available), most commonly vibration hardware.

This interface is accessible through the `Gamepad.hapticActuators` property.

## Instance properties

- `GamepadHapticActuator.effects` (read-only) (experimental)
    Returns an array of enumerated values representing the different haptic effects that the actuator supports.
- `GamepadHapticActuator.type` (deprecated) (read-only) (non-standard)
    Returns an enumerated value representing the type of the haptic hardware. This property is deprecated: use `GamepadHapticActuator.effects` to detect effect support.

## Instance methods

- `GamepadHapticActuator.playEffect()`
    Causes the hardware to play a specific vibration effect.
- `GamepadHapticActuator.pulse()`
    Makes the hardware pulse at a certain intensity for a specified duration.
- `GamepadHapticActuator.reset()`
    Stops the hardware from playing an active vibration effect.

## Examples

```js
const gamepad = navigator.getGamepads()[0];

gamepad.hapticActuators[0].pulse(1.0, 200);

gamepad.vibrationActuator.playEffect("dual-rumble", {
  startDelay: 0,
  duration: 200,
  weakMagnitude: 1.0,
  strongMagnitude: 1.0,
});
```

## See also

- Gamepad API
