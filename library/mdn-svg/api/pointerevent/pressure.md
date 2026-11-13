---
title: "PointerEvent: pressure property"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/pointerevent/pressure/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# PointerEvent: pressure property

The **`pressure`** read-only property of the
`PointerEvent` interface indicates the normalized pressure of the pointer
input.

## Value

The normalized pressure of the pointer input in the range of `0` to `1`, inclusive, where `0` and `1` represent the minimum and maximum pressure the hardware is capable of detecting, respectively. For hardware that does not support pressure, such as a mouse, the value is `0.5` when the pointer is active buttons state and `0` otherwise.

## Examples

In this snippet, when a `pointerdown` event is fired, different functions
are called depending on the value of the event's `pressure` property.

```js
someElement.addEventListener("pointerdown", (event) => {
  if (event.pressure === 0) {
    // No pressure
    process_no_pressure(event);
  } else if (event.pressure === 1) {
    // Maximum pressure
    process_max_pressure(event);
  } else {
    // Default
    processPressure(event);
  }
});
```

## See also

- `Touch.force`
