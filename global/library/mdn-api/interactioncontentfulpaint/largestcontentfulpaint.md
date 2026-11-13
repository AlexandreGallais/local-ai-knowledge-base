---
title: "InteractionContentfulPaint: largestContentfulPaint property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/interactioncontentfulpaint/largestcontentfulpaint/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# InteractionContentfulPaint: largestContentfulPaint property

The **`largestContentfulPaint`** read-only property of the `PerformanceSoftNavigation` interface returns the current largest `LargestContentfulPaint` relevant to this soft navigation.

This can remain the same between two `InteractionContentfulPaint` entries for the same interaction if a new contentful paint is smaller than the current largest contentful paint for that interaction. When using this API to measure Largest Contentful Paint (LCP) for soft navigations you may only be interested in the largest paint.

Note that, in current implementations, `InteractionContentfulPaint` is scoped to increasing paint sizes, so it can be used to measure Largest Contentful Paint (LCP) for Soft Navigations; the `largestContentfulPaint` value should change each time. However, the API has been designed to allow for all paints relevant to an interaction to be emitted, so this is liable to change.

## Value

A `LargestContentfulPaint` object representing the largest contentful paint (LCP) for this interaction contentful paint.

## Examples

### Logging the largest contentful paint of `InteractionContentfulPaint`

In this example, calling `entry.largestContentfulPaint` returns a `LargestContentfulPaint` object.

```js
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    console.log(
      "Interaction Contentful Paint:",
      entry.startTime,
      entry.largestContentfulPaint,
    );
  }
});
observer.observe({ type: "interaction-contentful-paint", buffered: true });
```

To get a JSON string, you can use `JSON.stringify(entry)` directly; it will call `toJSON()` automatically.

## See also

- `LargestContentfulPaint`
