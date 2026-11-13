---
title: "Navigator: getGamepads() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/navigator/getgamepads/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Navigator: getGamepads() method

The **`Navigator.getGamepads()`** method returns an array of
`Gamepad` objects, one for each gamepad connected to the device.

Elements in the array may be `null` if a gamepad disconnects during a
session, so that the remaining gamepads retain the same index.

## Syntax

```js
getGamepads()
```

### Parameters

None.

### Return value

An `Array` of `Gamepad` objects, eventually empty.

### Exceptions

- `SecurityError` `DOMException`
    Use of this feature was blocked by a Permissions Policy.

## Examples

```js
window.addEventListener("gamepadconnected", (e) => {
  const gp = navigator.getGamepads()[e.gamepad.index];
  console.log(
    `Gamepad connected at index ${gp.index}: ${gp.id} with ${gp.buttons.length} buttons, ${gp.axes.length} axes.`,
  );
});
```

## See also

- Using the Gamepad API
- Gamepad API
