---
title: "Gamepad: id property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gamepad/id/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Gamepad: id property

The **`id`** read-only property of the `Gamepad` interface returns a string containing some information about the controller.

The exact syntax is not strictly specified, but in Firefox it will contain three pieces
of information separated by dashes (`-`):

- Two 4-digit hexadecimal strings containing the USB vendor and product id of the
  controller
- The name of the controller as provided by the driver.

For example, a PS2 controller returned **810-3-USB Gamepad**.

This information is intended to allow you to find a mapping for the controls on the
device as well as display useful feedback to the user.

## Value

A string primitive.

## Examples

```js
window.addEventListener("gamepadconnected", () => {
  const gp = navigator.getGamepads()[0];
  gamepadInfo.textContent = `Gamepad connected at index ${gp.index}: ${gp.id}.`;
});
```

## See also

Using the Gamepad API
