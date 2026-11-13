---
title: "Touch: touchType property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/touch/touchtype/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Touch: touchType property

The **`touchType`** read-only property of the `Touch` interface returns the type of device that triggered the touch, such as a stylus, or direct touch from a finger.

## Value

A string from the `TouchType` enumeration. Possible values are:

- `"direct"`
    The touch was made by a direct contact, such as a finger on the screen.
- `"stylus"`
    The touch was made using a stylus or pen device.

## Example

### Basic usage

```js
someElement.addEventListener(
  "touchstart",
  (event) => {
    for (const touch of event.changedTouches) {
      console.log(`Touch type: ${touch.touchType}`);

      if (touch.touchType === "stylus") {
        // Handle stylus-specific input, such as altitude and azimuth angles.
        console.log(`altitudeAngle: ${touch.altitudeAngle}`);
        console.log(`azimuthAngle: ${touch.azimuthAngle}`);
      }
    }
  },
  false,
);
```

## See also

- `Touch.altitudeAngle`
- `Touch.azimuthAngle`
- Touch events
