---
title: "GamepadButton: pressed property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gamepadbutton/pressed/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GamepadButton: pressed property

The **`GamepadButton.pressed`** property of the
`GamepadButton` interface returns a `boolean` indicating whether
the button is currently pressed (`true`) or unpressed (`false`).

## Value

A boolean value.

## Examples

```js
let gp = navigator.getGamepads()[0]; // Get the first gamepad object

if (gp.buttons[0].pressed) {
  // respond to button being pressed
}
```

## See also

- Using the Gamepad API
