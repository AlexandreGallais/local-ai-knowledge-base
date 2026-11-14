---
title: "GamepadButton: touched property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gamepadbutton/touched/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GamepadButton: touched property

The **`touched`** property of the
`GamepadButton` interface returns a `boolean` indicating whether
a button capable of detecting touch is currently touched (`true`) or not touched (`false`).

If the button is not capable of detecting touch but can return an analog value, the property will be `true` if the value is greater than `0`, and `false` otherwise. If the button is not capable of detecting touch and can only report a digital value, then it should mirror the `GamepadButton.pressed` property.

## Value

A `Boolean`. True if touched.

## Examples

```js
let gp = navigator.getGamepads()[0]; // Get the first gamepad object

if (gp.buttons[0].touched) {
  // respond to button being touched
}
```

## See also

- Using the Gamepad API
