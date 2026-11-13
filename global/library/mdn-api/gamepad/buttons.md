---
title: "Gamepad: buttons property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gamepad/buttons/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Gamepad: buttons property

The **`buttons`** read-only property of the `Gamepad` interface returns an array of `GamepadButton` objects representing the buttons present on the device.

Each entry in the array is `0` if the button is not pressed, and non-zero (typically `1.0`) if the button is pressed.

## Value

An array of `GamepadButton` objects.

## Examples

Depending on the type of button, we need to access the `GamepadButton.value` or `GamepadButton.pressed` properties. This
example supports both:

```js
function gameLoop() {
  const gp = navigator.getGamepads()[0];

  if (gp.buttons[0].value > 0 || gp.buttons[0].pressed) {
    b--;
  } else if (gp.buttons[1].value > 0 || gp.buttons[1].pressed) {
    a++;
  } else if (gp.buttons[2].value > 0 || gp.buttons[2].pressed) {
    b++;
  } else if (gp.buttons[3].value > 0 || gp.buttons[3].pressed) {
    a--;
  }

  ball.style.left = `${a * 2}px`; // ball is a UI widget
  ball.style.top = `${b * 2}px`;

  requestAnimationFrame(gameLoop);
}
```

## See also

Using the Gamepad API
