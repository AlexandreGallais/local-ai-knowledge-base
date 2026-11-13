---
title: "GamepadHapticActuator: reset() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gamepadhapticactuator/reset/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GamepadHapticActuator: reset() method

The **`reset()`** method of the `GamepadHapticActuator` interface stops the hardware from playing an active vibration effect.

## Syntax

```js
reset()
```

### Parameters

None.

### Return value

A promise that resolves with `"complete"` if the effect is successfully reset, or `"preempted"` if the effect was stopped or replaced by another effect.

The promise may reject with the following exception types:

- `InvalidStateError` `DOMException`
    Promise rejects with `InvalidStateError` if the current document is not active or hidden.

## Examples

```js
const gamepad = navigator.getGamepads()[0];

setTimeout(() => {
  gamepad.vibrationActuator.reset();
}, 150);

gamepad.vibrationActuator
  .playEffect("dual-rumble", {
    startDelay: 0,
    duration: 200,
    weakMagnitude: 1.0,
    strongMagnitude: 1.0,
  })
  .then((result) => console.log(result));
// Should log "preempted" because reset() will run before the effect ends
```

## See also

- Gamepad API
