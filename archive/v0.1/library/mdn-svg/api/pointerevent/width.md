---
title: "PointerEvent: width property"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/pointerevent/width/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# PointerEvent: width property

The **`width`** read-only property of the
`PointerEvent` interface represents the width of the pointer's contact
geometry along the x-axis, measured in CSS pixels. Depending on the source of the
pointer device (such as a finger), for a given pointer, each event may produce a
different value.

If the input hardware cannot report the contact geometry to the browser, the width
defaults to `1`.

## Value

The width of the event's contact area (in CSS pixels).

## Examples

This example illustrates using the `PointerEvent` interface's
`width` and
`height` properties to calculate the contact area.

```js
target.addEventListener("pointerdown", (ev) => {
  // Calculate the contact area
  const area = ev.width * ev.height;
});
```
