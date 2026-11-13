---
title: "PointerEvent: width property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/pointerevent/width/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
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
