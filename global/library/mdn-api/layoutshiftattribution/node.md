---
title: "LayoutShiftAttribution: node property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/layoutshiftattribution/node/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# LayoutShiftAttribution: node property

The **`node`** read-only property of the `LayoutShiftAttribution` interface returns a `Node` representing the object that has shifted.

## Value

A `Node`.

## Examples

The following example prints the `node` of the first item in `LayoutShift.sources` to the console.

```js
new PerformanceObserver((list) => {
  for (const { sources } of list.getEntries()) {
    if (sources) {
      console.log(sources[0].node);
    }
  }
}).observe({ type: "layout-shift", buffered: true });
```
