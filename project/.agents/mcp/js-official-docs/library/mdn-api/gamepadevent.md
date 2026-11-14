---
title: "GamepadEvent"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gamepadevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GamepadEvent

The GamepadEvent interface of the Gamepad API contains references to gamepads connected to the system, which is what the gamepad events `gamepadconnected` and `gamepaddisconnected` are fired in response to.

## Constructor

- `GamepadEvent()`
    Returns a new `GamepadEvent` object.

## Instance properties

- `GamepadEvent.gamepad` (read-only)
    Returns a `Gamepad` object, providing access to the associated gamepad data for the event fired.

## Examples

The gamepad property being called on a fired `gamepadconnected` event.

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

And on a `gamepaddisconnected` event.

```js
window.addEventListener("gamepaddisconnected", (e) => {
  console.log(
    "Gamepad disconnected from index %d: %s",
    e.gamepad.index,
    e.gamepad.id,
  );
});
```

## See also

Using the Gamepad API
