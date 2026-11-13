---
title: "PointerEvent: altitudeAngle property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/pointerevent/altitudeangle/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PointerEvent: altitudeAngle property

The **`altitudeAngle`** read-only property of the `PointerEvent` interface represents the angle between a transducer (a pointer or stylus) axis and the X-Y plane of a device screen.
The altitude angle describes whether the transducer is perpendicular to the screen, parallel, or at some angle in between.

Depending on the specific hardware and platform, user agents will likely only receive one set of values for the transducer orientation relative to the screen plane — either `tiltX` and `tiltY` or `altitudeAngle` and `azimuthAngle`.

For an additional illustration of this property, see Figure 4 in the specification.

## Value

An angle in radians between `0` and `π/2` where `0` is parallel to the device surface (X-Y plane), and `π/2` is perpendicular to the surface.
Defaults to `π/2` (perpendicular to the surface) which differs from the `altitudeAngle` in touch events which defaults to `0` (parallel to the surface).
For hardware and platforms that do not report tilt or angle, the value is `π/2`.

## Example

```js
someElement.addEventListener("pointerdown", (event) => {
  process_angles(event.altitudeAngle, event.azimuthAngle);
});
```

## See also

- `PointerEvent.azimuthAngle`
- `PointerEvent.tiltX`
- `PointerEvent.tiltY`
- `Touch.altitudeAngle`
