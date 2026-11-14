---
title: "PointerEvent: pressure property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/pointerevent/pressure/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
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
