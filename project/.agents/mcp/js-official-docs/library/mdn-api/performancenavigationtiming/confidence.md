---
title: "PerformanceNavigationTiming: confidence property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/performancenavigationtiming/confidence/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PerformanceNavigationTiming: confidence property

The **`confidence`** read-only property of the `PerformanceNavigationTiming` interface returns a `PerformanceTimingConfidence` object containing information that indicates whether a performance record reflects typical application performance, or is likely affected by external factors.

For example, if a website has loaded after a browser "cold start" or session restore, its pages may load more slowly as a result. In such cases, a `low` confidence `value` would be returned for an associated performance record. On the other hand, if the browser determines a returned performance record to be representative of typical application performance, a `high` confidence value is returned.

This confidence measure is useful for developers when trying to determine whether a performance issue is a legitimate concern, or an outlier being caused by external factors.

## Value

A `PerformanceTimingConfidence` object.

## Examples

### Basic usage

This example uses a `PerformanceObserver` to retrieve confidence data from observed `PerformanceNavigationTiming` entries. The `value` property is an enumerated value of `low` or `high`, indicating a broad confidence measure, whereas the `randomizedTriggerRate` property is a number inside the interval `0` to `1` inclusive, representing a percentage value that indicates how often noise is applied when exposing the `value`.

```js
const observer = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    console.log(
      `${entry.name} confidence: ${entry.confidence.value}`,
      `Trigger rate: ${entry.confidence.randomizedTriggerRate}`,
    );
  });
});

observer.observe({ type: "navigation", buffered: true });
```

## See also

- `PerformanceTimingConfidence`
