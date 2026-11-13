---
title: "LayoutShiftAttribution: previousRect property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/layoutshiftattribution/previousrect/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# LayoutShiftAttribution: previousRect property

The **`previousRect`** read-only property of the `LayoutShiftAttribution` interface returns a `DOMRectReadOnly` object representing the position of the element before the shift.

## Value

A `DOMRectReadOnly` object.

## Examples

The following example prints the `previousRect` of the first item in `LayoutShift.sources` to the console.

```js
new PerformanceObserver((list) => {
  for (const { sources } of list.getEntries()) {
    if (sources) {
      console.log(sources[0].previousRect);
    }
  }
}).observe({ type: "layout-shift", buffered: true });
```
