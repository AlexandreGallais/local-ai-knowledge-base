---
title: "LayoutShift: hadRecentInput property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/layoutshift/hadrecentinput/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# LayoutShift: hadRecentInput property

The **`hadRecentInput`** read-only property of the `LayoutShift` interface returns `true` if `lastInputTime` is less than 500 milliseconds in the past.

Layout shifts are only a problem if the user is not expecting them, so layout shifts that are the result of user interactions (such as a user expanding a UI element) are often not considered in layout shift metrics. The `hadRecentInput` property allows you to exclude these shifts.

## Value

A boolean returning `true` if `lastInputTime` is less than 500 milliseconds in the past; `false` otherwise.

## Examples

### Ignoring recent user input for layout shift scores

The following example shows how the `hadRecentInput` property is used to only count layout shifts without recent user input.

```js
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    // Count layout shifts without recent user input only
    if (!entry.hadRecentInput) {
      console.log("LayoutShift value:", entry.value);
      if (entry.sources) {
        for (const { node, currentRect, previousRect } of entry.sources)
          console.log("LayoutShift source:", node, {
            currentRect,
            previousRect,
          });
      }
    }
  }
});

observer.observe({ type: "layout-shift", buffered: true });
```

## See also

- `LayoutShift.lastInputTime`
