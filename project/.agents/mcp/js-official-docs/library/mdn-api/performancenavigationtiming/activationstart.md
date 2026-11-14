---
title: "PerformanceNavigationTiming: activationStart property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/performancenavigationtiming/activationstart/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PerformanceNavigationTiming: activationStart property

The **`activationStart`** read-only property represents the time between when a document starts prerendering and when it is activated.

## Value

A `DOMHighResTimeStamp` representing the duration between document prerendering start and activation in milliseconds.

The value is `0` if the page has not prerendered or is still prerendering.

## Examples

### Detecting prerendered pages

When a prerendered document is activated, `activationStart` is set to the current time. The following function can check whether a page is `prerendering` or has already prerendered:

```js
function pagePrerendered() {
  return (
    document.prerendering ||
    self.performance?.getEntriesByType?.("navigation")[0]?.activationStart > 0
  );
}
```

### Measuring user-perceived performance milestones

With prerendered pages, a page may have been created long before it was actually navigated to. When using the Performance API on prerendered pages, it is vital to compare returned values with `activationStart` in order to avoid misleading measurements.

```js
// Time to when activation occurred
let activationStart =
  performance.getEntriesByType("navigation")[0].activationStart;

// Time to first paint
let firstPaint = performance.getEntriesByName("first-paint")[0].startTime;

// Time to first contentful paint
let firstContentfulPaint = performance.getEntriesByName(
  "first-contentful-paint",
)[0].startTime;

console.log(`time to first paint: ${firstPaint - activationStart}`);
console.log(
  `time to first-contentful-paint: ${firstContentfulPaint - activationStart}`,
);
```

## See also

- Speculation Rules API
- Speculative loading
