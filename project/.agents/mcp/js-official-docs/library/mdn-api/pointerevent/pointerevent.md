---
title: "PointerEvent: PointerEvent() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/pointerevent/pointerevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PointerEvent: PointerEvent() constructor

The **`PointerEvent()`** constructor creates a new synthetic
and untrusted `PointerEvent` object instance.

## Syntax

```js
new PointerEvent(type)
new PointerEvent(type, options)
```

### Parameters

- `type`
    A string representing the name of the event
    (see PointerEvent event types).
- `options` (optional)
    An object that, _in addition of the properties defined in `MouseEvent()`_, can have the following properties:
    - `pointerId`
        A number, defaulting to `0`, that sets the value of the instance's `PointerEvent.pointerId`.
    - `width`
        A number, defaulting to `1`, that sets the value of the instance's `PointerEvent.width`.
    - `height`
        A number, defaulting to `1`, that sets the value of the instance's `PointerEvent.height`.
    - `pressure`
        A number, defaulting to `0`, that sets the value of the instance's `PointerEvent.pressure`.
    - `tangentialPressure`
        A number, defaulting to `0`, that sets the value of the instance's `PointerEvent.tangentialPressure`.
    - `altitudeAngle`
        A number that sets the value of the instance's `PointerEvent.altitudeAngle`.
    - `azimuthAngle`
        A number that sets the value of the instance's `PointerEvent.azimuthAngle`.
    - `tiltX`
        A number that sets the value of the instance's `PointerEvent.tiltX`.
    - `tiltY`
        A number that sets the value of the instance's `PointerEvent.tiltY`.
    - `twist`
        A number, defaulting to `0`, that sets the value of the instance's `PointerEvent.twist`.
    - `pointerType`
        A string, defaulting to `""` that sets the value of the instance's `PointerEvent.pointerType`.
    - `isPrimary`
        A boolean value, defaulting to `false` that sets the value of the instance's `PointerEvent.isPrimary`.

### Return value

A new `PointerEvent` object.

## Examples

```js
const moveEvent = new PointerEvent("pointermove");

const downEvent = new PointerEvent("pointerdown", {
  pointerId: 1,
  bubbles: true,
  cancelable: true,
  pointerType: "touch",
  width: 100,
  height: 100,
  isPrimary: true,
});
```
