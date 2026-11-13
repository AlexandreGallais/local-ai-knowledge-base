---
title: "GamepadHapticActuator: pulse() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gamepadhapticactuator/pulse/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GamepadHapticActuator: pulse() method

The **`pulse()`** method of the `GamepadHapticActuator` interface makes the hardware pulse at a certain intensity for a specified duration.

## Syntax

```js
pulse(value, duration)
```

### Parameters

- `value`
    A double representing the intensity of the pulse. This can vary depending on the hardware type, but generally takes a value between 0.0 (no intensity) and 1.0 (full intensity).
- `duration`
    A double representing the duration of the pulse, in milliseconds.

> **Note:**
> Repeated calls to `pulse()` override the previous calls if they are still ongoing.

### Return value

A promise that resolves with a value of `true` when the pulse has successfully completed.

## Examples

```js
const gamepad = navigator.getGamepads()[0];

gamepad.hapticActuators[0].pulse(1.0, 200);
```

## See also

- Gamepad API
