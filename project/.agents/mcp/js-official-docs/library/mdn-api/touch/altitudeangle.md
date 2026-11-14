---
title: "Touch: altitudeAngle property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/touch/altitudeangle/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Touch: altitudeAngle property

The **`altitudeAngle`** read-only property of the `Touch` interface returns the angle between a transducer (a pointer or stylus) axis and the X-Y plane of a device screen. The altitude angle describes whether the transducer is perpendicular to the screen, parallel, or at some angle in between.

> **Note:**
> The default value of `altitudeAngle` is `0` (parallel to the device surface), which differs from the `PointerEvent.altitudeAngle` property, which defaults to `π/2` (perpendicular to the surface).

For hardware and platforms that do not report tilt or angle, the value is `0`.

## Value

An angle in radians between `0` and `π/2`, where `0` is parallel to the device surface (X-Y plane), and `π/2` is perpendicular to the surface.

## Example

### Basic usage

```js
someElement.addEventListener(
  "touchstart",
  (event) => {
    for (const touch of event.changedTouches) {
      // Log the altitude and azimuth angles for each stylus touch point.
      if (touch.touchType === "stylus") {
        console.log(`altitudeAngle: ${touch.altitudeAngle}`);
        console.log(`azimuthAngle: ${touch.azimuthAngle}`);
      }
    }
  },
  false,
);
```

## See also

- `Touch.azimuthAngle`
- `Touch.touchType`
- `PointerEvent.altitudeAngle`
- Touch events
