---
title: "LargestContentfulPaint: size property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/largestcontentfulpaint/size/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# LargestContentfulPaint: size property

The **`size`** read-only property of the `LargestContentfulPaint` interface returns the intrinsic size of the element that is the largest contentful paint.

The `size` of the element is the `width` times `height` of the `rectangle` that this element creates on the screen.

## Value

An integer representing the width times height of the element.

## Examples

### Logging the size of the largest contentful paint element

This example uses a `PerformanceObserver` notifying of new `largest-contentful-paint` performance entries as they are recorded in the browser's performance timeline. The `buffered` option is used to access entries from before the observer creation.

```js
const observer = new PerformanceObserver((list) => {
  const entries = list.getEntries();
  const lastEntry = entries[entries.length - 1]; // Use the latest LCP candidate
  console.log(lastEntry.size);
});
observer.observe({ type: "largest-contentful-paint", buffered: true });
```
