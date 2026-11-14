---
title: "LargestContentfulPaint: element property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/largestcontentfulpaint/element/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# LargestContentfulPaint: element property

The **`element`** read-only property of the `LargestContentfulPaint` interface returns an object representing the `Element` that is the largest contentful paint.

## Value

An `Element`.

## Examples

### Logging the largest contentful paint element

This example uses a `PerformanceObserver` notifying of new `largest-contentful-paint` performance entries as they are recorded in the browser's performance timeline. The `buffered` option is used to access entries from before the observer creation.

```js
const observer = new PerformanceObserver((list) => {
  const entries = list.getEntries();
  const lastEntry = entries[entries.length - 1]; // Use the latest LCP candidate
  console.log(lastEntry.element);
});
observer.observe({ type: "largest-contentful-paint", buffered: true });
```
