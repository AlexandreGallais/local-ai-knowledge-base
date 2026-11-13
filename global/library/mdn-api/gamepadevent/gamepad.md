---
title: "GamepadEvent: gamepad property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gamepadevent/gamepad/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GamepadEvent: gamepad property

The **`GamepadEvent.gamepad`** property of the
**`GamepadEvent` interface** returns a `Gamepad`
object, providing access to the associated gamepad data for fired
`gamepadconnected` and `gamepaddisconnected` events.

## Value

A `Gamepad` object.

## Examples

The `gamepad` property being called on a fired
`gamepadconnected` event.

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

Using the Gamepad API
