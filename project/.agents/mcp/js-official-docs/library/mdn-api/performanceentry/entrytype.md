---
title: "PerformanceEntry: entryType property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/performanceentry/entrytype/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PerformanceEntry: entryType property

The read-only **`entryType`** property returns a string representing the type of performance metric that this entry represents.

All supported `entryTypes` are available using the static property `PerformanceObserver.supportedEntryTypes`.

## Value

A string. The return value depends on the subtype of the `PerformanceEntry` object. Some subtypes have more than one `entryType`.

- `container`
    Reports render time of groups of elements within a container.

    The entry instance will be a `PerformanceContainerTiming` object.

- `element`
    Reports load time of elements.

    The entry instance will be a `PerformanceElementTiming` object.

- `event`
    Reports event latencies.

    The entry instance will be a `PerformanceEventTiming` object.

- `first-input`
    Reports the First Input Delay (FID).

    The entry instance will be a `PerformanceEventTiming` object.

- `interaction-contentful-paint`
    Reports the largest paint an element triggered on screen after an interaction.

    The entry instance will be an `InteractionContentfulPaint` object.

- `largest-contentful-paint`
    Reports the largest paint an element triggered on screen.

    The entry instance will be a `LargestContentfulPaint` object.

- `layout-shift`
    Reports layout stability of web pages based on movements of the elements on the page.

    The entry instance will be a `LayoutShift` object.

- `long-animation-frame`
    Reports instances of long animation frames (LoAFs).

    The entry instance will be a `PerformanceLongAnimationFrameTiming` object.

- `longtask`
    Reports instances of long tasks.

    The entry instance will be a `PerformanceLongTaskTiming` object.

- `mark`
    Reports your own custom performance markers.

    The entry instance will be a `PerformanceMark` object.

- `measure`
    Reports your own custom performance measures.

    The entry instance will be a `PerformanceMeasure` object.

- `navigation`
    Reports document navigation timing.

    The entry instance will be a `PerformanceNavigationTiming` object.

- `paint`
    Reports key <example-value> of document rendering (first paint, first contentful paint) during page load.

    The entry instance will be a `PerformancePaintTiming` object.

- `resource`
    Reports timing information for resources in a document.

    The entry instance will be a `PerformanceResourceTiming` object.

- `soft-navigation`
    Reports the paints triggered on screen after a user interaction and a URL update triggered a soft navigation.

    The entry instance will be a `PerformanceSoftNavigation` object.

- `taskattribution`
    Reports the type of work that contributed significantly to the long task.

    The entry instance will be a `TaskAttributionTiming` object.

- `visibility-state`
    Reports the timing of page visibility state changes, i.e., when a tab changes from the foreground to the background or vice versa.

    The entry instance will be a `VisibilityStateEntry` object.

## Examples

### Filtering performance entries by type

The `entryType` property can be useful when filtering out specific performance entries. For example, you might want to check all script resources, so you would check for an `entryType` of `"resource"` and an `initiatorType` of `"script"`.

```js
const scriptResources = performance
  .getEntries()
  .filter(
    (entry) =>
      entry.entryType === "resource" && entry.initiatorType === "script",
  );
console.log(scriptResources);
```

### Getting performance entries by type

Both, `Performance` and `PerformanceObserver`, provide methods that allow you to get performance entries by type directly. You don't necessarily need the `entryType` property for that, instead you might use `Performance.getEntriesByType()` or `PerformanceObserverEntryList.getEntriesByType()`.

Also, when observing with a `PerformanceObserver`, the `observe()` method takes an array of `entryTypes` in its options object where you can decide which entry types to observe.

```js
// Log all resource entries at this point
const resources = performance.getEntriesByType("resource");
resources.forEach((entry) => {
  console.log(`${entry.name}'s duration: ${entry.duration}`);
});

// PerformanceObserver version
// Log all resource entries when they are available
function perfObserver(list, observer) {
  list.getEntriesByType("resource").forEach((entry) => {
    console.log(`${entry.name}'s duration: ${entry.duration}`);
  });
}
const observer = new PerformanceObserver(perfObserver);
observer.observe({ entryTypes: ["resource", "navigation"] });
```

## See also

- `PerformanceObserver.supportedEntryTypes`
- `Performance.getEntriesByType()`
- `PerformanceObserverEntryList.getEntriesByType()`
