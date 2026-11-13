---
title: "PointerEvent: tiltX property"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/pointerevent/tiltx/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# PointerEvent: tiltX property

The **`tiltX`** read-only property of the `PointerEvent` interface is the angle (in degrees) between the _Y-Z plane_ of the pointer and the screen.
This property is typically only useful for a pen/stylus pointer type.

Depending on the specific hardware and platform, user agents will likely only receive one set of values for the transducer orientation relative to the screen plane — either `tiltX` and `tiltY` or `altitudeAngle` and `azimuthAngle`.

For an additional illustration of this property see Figure 2 in the specification.

## Value

The angle in degrees between the Y-Z plane of the pointer (stylus) and the screen. The range of values is `-90` to `90`, inclusive, where a positive value is a tilt to the right.
For devices that do not support this property, the value is `0`.

## Examples

This example illustrates simple accessing of the `tiltX` and `tiltY` properties.

```js
someElement.addEventListener("pointerdown", (event) => {
  processTilt(event.tiltX, event.tiltY);
});
```

## See also

- `PointerEvent.tiltY`
- `PointerEvent.altitudeAngle`
- `PointerEvent.azimuthAngle`
