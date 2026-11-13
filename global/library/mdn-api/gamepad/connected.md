---
title: "Gamepad: connected property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gamepad/connected/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Gamepad: connected property

The **`connected`** read-only property of the `Gamepad` interface returns a boolean indicating whether the gamepad is still connected to the system.

If the gamepad is connected, the value is `true`; if not, it is
`false`.

## Value

A boolean.

## Examples

```js
const gp = navigator.getGamepads()[0];
console.log(gp.connected);
```

## See also

Using the Gamepad API
