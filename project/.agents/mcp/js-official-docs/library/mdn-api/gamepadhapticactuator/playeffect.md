---
title: "GamepadHapticActuator: playEffect() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gamepadhapticactuator/playeffect/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GamepadHapticActuator: playEffect() method

The **`playEffect()`** method of the `GamepadHapticActuator` interface causes the hardware to play a specific vibration effect.

## Syntax

```js
playEffect(type, params)
```

### Parameters

- `type`
    A string representing the desired effect. Possible values are `"dual-rumble"` and `"trigger-rumble"`, and their effects can vary depending on the hardware type. See `GamepadHapticActuator.effects` for further details of the effect types.

- `params`
    An object to describe a desired haptic effect.

    Expected values are:
    - `duration` (optional)
        The duration of the effect in milliseconds.
        Defaults to `0`.
    - `startDelay` (optional)
        The delay in milliseconds before the effect is started.
        Defaults to `0`.
    - `strongMagnitude` (optional)
        The rumble intensity of the low-frequency (strong) rumble motors, normalized to the range between `0.0` and `1.0`.
        Defaults to `0.0`.
    - `weakMagnitude` (optional)
        The rumble intensity of the high-frequency (weak) rumble motors, normalized to the range between `0.0` and `1.0`.
        Defaults to `0.0`.
    - `leftTrigger` (relevant to `"trigger-rumble"` effects only) (optional)
        The rumble intensity of the bottom-left front trigger, normalized to the range between `0.0` and `1.0`.
        Defaults to `0.0`.
    - `rightTrigger` (relevant to `"trigger-rumble"` effects only) (optional)
        The rumble intensity of the bottom-right front trigger, normalized to the range between `0.0` and `1.0`.
        Defaults to `0.0`.

> **Note:**
> A new call to `playEffect()` overrides a previous ongoing call.

### Return value

A promise that resolves with `"complete"` when the effect successfully completes, or `"preempted"` if the current effect is stopped or replaced by another effect.

The promise may reject with the following exception types:

- `InvalidStateError` `DOMException`
    The current document is not active or hidden.
- `NotSupportedError` `DOMException`
    The requested `type` is not supported by the current gamepad's actuator.
- `TypeError`
    The requested `type` is not a valid effect type.

## Examples

```js
const gamepad = navigator.getGamepads()[0];

gamepad.vibrationActuator
  .playEffect("dual-rumble", {
    startDelay: 0,
    duration: 200,
    weakMagnitude: 1.0,
    strongMagnitude: 1.0,
  })
  .then((result) => console.log(result));
// Should log "complete" if effect successfully runs
```

## See also

- Gamepad API
