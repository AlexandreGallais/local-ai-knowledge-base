---
title: "PointerEvent: tangentialPressure property"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/pointerevent/tangentialpressure/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# PointerEvent: tangentialPressure property

The **`tangentialPressure`** read-only property of the
`PointerEvent` interface represents the normalized tangential pressure of
the pointer input (also known as barrel pressure or cylinder stress).

## Value

A `float` representing the normalized tangential pressure of the pointer
input in the range `-1` to `1`, inclusive, where `0` is
the neutral position of the control.

Note that some hardware may only support positive values in the range `0` to
`1`. For hardware that does not support tangential pressure, the value will
be `0`.

## Examples

In this snippet, when a `pointerdown` event is fired, different functions
are called depending on the value of the event's `tangentialPressure`
property.

```js
someElement.addEventListener("pointerdown", (event) => {
  if (event.tangentialPressure === 0) {
    // No pressure
    process_no_tanPressure(event);
  } else if (event.tangentialPressure === 1) {
    // Maximum pressure
    process_max_tanPressure(event);
  } else {
    // Default
    process_tanPressure(event);
  }
});
```

## See also

- `Touch.force`
