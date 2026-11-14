---
title: "LayoutShift: value property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/layoutshift/value/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# LayoutShift: value property

The **`value`** read-only property of the `LayoutShift` interface returns the layout shift score calculated as the impact fraction (fraction of the viewport that was shifted) multiplied by the distance fraction (distance moved as a fraction of viewport).

## Value

A number between `0.0` and `1.0` indicating the layout shift score.

It is calculated as the impact fraction (fraction of the viewport that was shifted) multiplied by the distance fraction (distance moved as a fraction of viewport).

```plain
layout shift score = impact fraction * distance fraction
```

For more details, see Layout shift score on web.dev.

## Examples

### Logging the entry's layout shift score

The following example shows how to use the `value` property to log the layout shift score.

```js
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    // Count layout shifts without recent user input only
    if (!entry.hadRecentInput) {
      console.log("Entry's layout shift score:", entry.value);
    }
  }
});

observer.observe({ type: "layout-shift", buffered: true });
```
