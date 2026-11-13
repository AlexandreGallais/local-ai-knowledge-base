---
title: "Performance: interactionCount property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/performance/interactioncount/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Performance: interactionCount property

The read-only `performance.interactionCount` property represents the number of real-user interactions that have occurred on the page since it was loaded.

Only discrete interactions with an `interactionId` — such as clicks and key <example-value> — are counted. Other interactions, such as scroll interactions, are excluded.

This is useful when calculating Interaction to Next Paint (INP), and in particular to exclude outliers for long-lived pages. INP takes the 98th percentile of interactions for a page and so excludes 1 in every 50 interactions as "outliers" that are not reflective of overall page responsiveness.

## Value

A number, which is initially `0`, and increments by `1` with each discrete interaction as measured by `PerformanceEventTiming`, where an `interactionId` is assigned.

## Examples

### Checking the number of interactions to accurately calculate INP

For pages with a large number of interactions, you can recalculate INP after
excluding 1 out of every 50 outliers using the following pattern:

```js
if (performance.interactionCount >= 50) {
  recalculateINP(); // Actual calculation is complex and is not shown here
}
```

## See also

- `PerformanceEventTiming`
- `PerformanceEventTiming.interactionId`
- Interaction to Next Paint (INP)
