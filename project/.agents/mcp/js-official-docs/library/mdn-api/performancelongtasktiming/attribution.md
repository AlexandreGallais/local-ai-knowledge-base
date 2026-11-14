---
title: "PerformanceLongTaskTiming: attribution property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/performancelongtasktiming/attribution/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PerformanceLongTaskTiming: attribution property

The **`attribution`** read-only property of the `PerformanceLongTaskTiming` interface returns an array of `TaskAttributionTiming` objects.

## Value

An `Array` of `TaskAttributionTiming` objects.

## Examples

### Logging attributions for long tasks

```js
const observer = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    entry.attribution.forEach((attributionEntry) => {
      console.log(attributionEntry);
    });
  });
});

observer.observe({ type: "longtask", buffered: true });
```

## See also

- `TaskAttributionTiming`
