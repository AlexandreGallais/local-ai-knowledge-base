---
title: "GamepadEvent: GamepadEvent() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gamepadevent/gamepadevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GamepadEvent: GamepadEvent() constructor

The **`GamepadEvent()`** constructor creates a new `GamepadEvent` object.

## Syntax

```js
new GamepadEvent(type, options)
```

### Parameters

- `type`
    A string with the name of the event.
    It is case-sensitive and browsers set it to `gamepadconnected` or `gamepaddisconnected`.
- `options`
    An object that, _in addition of the properties defined in `Event()`_, can have the following properties:
    - `gamepad`
        A `Gamepad` object describing the gamepad associated with the event.

### Return value

A new `GamepadEvent` object.
