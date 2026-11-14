---
title: "GamepadButton: value property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gamepadbutton/value/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GamepadButton: value property

The **`GamepadButton.value`** property of the
`GamepadButton` interface returns a double value used to represent the
current state of analog buttons on many modern gamepads, such as the triggers.

The values are normalized to the range `0.0` — `1.0`, with
`0.0` representing a button that is not pressed, and 1.0 representing a
button that is fully pressed.

## Value

A double.

## Examples

```js
let gp = navigator.getGamepads()[0];

if (gp.buttons[0].value > 0) {
  // respond to analog button being pressed in
}
```

## See also

Using the Gamepad API
