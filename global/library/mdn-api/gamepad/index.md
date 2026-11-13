---
title: "Gamepad: index property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gamepad/index/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Gamepad: index property

The **`index`** read-only property of the `Gamepad` interface returns an integer that is auto-incremented to be unique for each device currently connected to the system.

This can be used to distinguish multiple controllers; a gamepad that is disconnected
and reconnected will retain the same index.

## Value

A `Number`.

## Examples

```js
window.addEventListener("gamepadconnected", () => {
  const gp = navigator.getGamepads()[0];
  gamepadInfo.textContent = `Gamepad connected at index ${gp.index}: ${gp.id}.`;
});
```

## See also

Using the Gamepad API
