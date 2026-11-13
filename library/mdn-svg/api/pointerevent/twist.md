---
title: "PointerEvent: twist property"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/pointerevent/twist/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# PointerEvent: twist property

The **`twist`** read-only property of the
`PointerEvent` interface represents the clockwise rotation of the pointer
(e.g., pen stylus) around its major axis, in degrees.

## Value

A `long` value representing the amount of twist, in degrees, applied to the
transducer (pointer). The value is in the range `0` to `359`,
inclusive. For devices that do not report `twist`, the value is
`0`.

## Examples

When a `pointerdown` event is fired, different functions are called
depending on the value of the event's `twist` property.

```js
someElement.addEventListener("pointerdown", (event) => {
  if (event.twist === 0) {
    // No twist
    process_no_twist(event);
  } else {
    // Default
    process_twist(event);
  }
});
```

## See also

- `Touch.force`
