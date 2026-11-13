---
title: "LayoutShift: sources property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/layoutshift/sources/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# LayoutShift: sources property

The **`sources`** read-only property of the `LayoutShift` interface returns an array of `LayoutShiftAttribution` objects that indicate the DOM elements that moved during the layout shift.

## Value

An `Array` of `LayoutShiftAttribution` objects. This array will not contain more than five sources. If there are more than five elements impacted by the layout shift, the five most impactful elements are reported.

## Examples

### Logging layout shift sources

```js
const observer = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    entry.sources.forEach((source) => {
      console.log(source);
    });
  });
});

observer.observe({ type: "layout-shift", buffered: true });
```

## See also

- `LayoutShiftAttribution`
