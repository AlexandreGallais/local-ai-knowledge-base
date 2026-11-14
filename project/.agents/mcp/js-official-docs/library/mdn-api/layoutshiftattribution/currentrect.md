---
title: "LayoutShiftAttribution: currentRect property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/layoutshiftattribution/currentrect/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# LayoutShiftAttribution: currentRect property

The **`currentRect`** read-only property of the `LayoutShiftAttribution` interface returns a `DOMRectReadOnly` object representing the position of the element after the shift.

## Value

A `DOMRectReadOnly` object.

## Examples

The following example prints the `currentRect` of the first item in `LayoutShift.sources` to the console.

```js
new PerformanceObserver((list) => {
  for (const { sources } of list.getEntries()) {
    if (sources) {
      console.log(sources[0].currentRect);
    }
  }
}).observe({ type: "layout-shift", buffered: true });
```
