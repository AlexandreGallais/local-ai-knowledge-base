---
title: "PerformanceSoftNavigation: getLargestInteractionContentfulPaint() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/performancesoftnavigation/getlargestinteractioncontentfulpaint/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PerformanceSoftNavigation: getLargestInteractionContentfulPaint() method

The **`getLargestInteractionContentfulPaint()`** method of the `PerformanceSoftNavigation` interface returns the current largest `InteractionContentfulPaint` relevant to this soft navigation.

Some Single Page Applications (SPAs) may paint first and update the URL afterwards. Despite this, developers will want to include these paints when measuring Largest Contentful Paint (LCP) for soft navigations. Because interaction with any paints could also lead to a URL update and thus a soft navigation at any point in the future, this could be difficult to measure without potentially saving a temporary reference to every interaction's LCP, should it be needed.

The `getLargestInteractionContentfulPaint()` method avoids developers having to do that by providing a means to get the latest, largest `InteractionContentfulPaint` for the soft navigation.

It is defined as a method rather than a static property because it returns the latest, largest entry, and therefore may return different results over time if increasing `InteractionContentfulPaint` entries are recorded after the soft navigation.

## Syntax

```js
getLargestInteractionContentfulPaint()
```

### Parameters

None.

### Return value

An `InteractionContentfulPaint` object representing the largest `InteractionContentfulPaint` for this soft navigation.

## Examples

### Using the `getLargestInteractionContentfulPaint` method

In this example, calling `entry.getLargestInteractionContentfulPaint()` returns a JSON representation of the `LargestContentfulPaint` object.

```js
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    console.log(
      "Soft Nav:",
      entry.startTime,
      entry.getLargestInteractionContentfulPaint(),
    );
  }
});
observer.observe({ type: "soft-navigation", buffered: true });
```

To get a JSON string, you can use `JSON.stringify(entry)` directly; it will call `toJSON()` automatically.

## See also

- `InteractionContentfulPaint`
