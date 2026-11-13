---
title: "Gamepad: mapping property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gamepad/mapping/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Gamepad: mapping property

The **`mapping`** read-only property of the `Gamepad` interface returns a string indicating whether the browser has remapped the controls on the device to a known layout.

The currently supported known layouts are:

- "standard" for the standard gamepad.
- "xr-standard" for the standard XR gamepad. See also `XRInputSource.gamepad`.

## Examples

```js
let gp = navigator.getGamepads()[0];
console.log(gp.mapping);
```

## See also

Using the Gamepad API
