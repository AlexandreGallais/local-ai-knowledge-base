---
title: "XRInputSource: gamepad property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrinputsource/gamepad/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRInputSource: gamepad property

The read-only `XRInputSource` property **`gamepad`** returns a `Gamepad` object describing the state of the buttons and axes on the XR input source, if it is a gamepad or comparable device. If the device isn't a gamepad-like device, this property's value is `null`.

The `Gamepad` instance returned behaves as described by the Gamepad API. However, there are a few things to note:

- `Gamepad` instances belonging to `XRInputSource` are not included in the array returned by `navigator.getGamepads()`. Gamepads are strictly associated with the WebXR hardware and are not general-purpose gaming devices.
- `Gamepad.id` is an empty string (`""`)
- `Gamepad.index` is `-1`
- `Gamepad.connected` is `true` until the `XRInputSource` is removed from the list of active XR input sources or the `XRSession` is ended.
- If an axis reported by `Gamepad.axes` represents an axis of a touchpad, the value is 0 when the associated `GamepadButton.touched` property is `false`.
- `Gamepad.mapping` returns "xr-standard".

## Examples

### Using a gamepad input source

```js
for (const source of frame.session.inputSources) {
  const gamepad = source.gamepad;
  if (gamepad) {
    if (gamepad.buttons[2].pressed) {
      // do something
    }
  }
}
```
