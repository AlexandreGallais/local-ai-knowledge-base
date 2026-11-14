---
title: "VisibilityStateEntry"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/visibilitystateentry/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# VisibilityStateEntry

The **`VisibilityStateEntry`** interface provides timings of page visibility state changes, i.e., when a tab changes from the foreground to the background or vice versa.

This can be used to pinpoint visibility changes on the performance timeline, and cross-reference them against other performance entries such as "first-contentful-paint" (see `PerformancePaintTiming`).

There are two key <example-value> state change times that this API reports on:

- `visible`: The time when the page becomes visible (i.e., when its tab moves into the foreground).
- `hidden`: The time when the pages become hidden (i.e., when its tab moves into the background).

The performance timeline will always have a `"visibility-state"` entry with a `startTime` of `0` and a `name` representing the initial page visibility state.

> **Note:**
> Like other Performance APIs, this API extends `PerformanceEntry`.

## Instance properties

This interface has no properties but it extends the properties of `PerformanceEntry` by qualifying and constraining them as follows:

- `PerformanceEntry.entryType` (read-only) (experimental)
    Returns `"visibility-state"`.
- `PerformanceEntry.name` (read-only) (experimental)
    Returns either `"visible"` or `"hidden"`.
- `PerformanceEntry.startTime` (read-only) (experimental)
    Returns the `timestamp` when the visibility state change occurred.
- `PerformanceEntry.duration` (read-only) (experimental)
    Returns 0.

## Instance methods

This interface has no methods.

## Examples

### Basic usage

The following function could be used to log a table of all `"visibility-state"` performance entries to the console:

```js
function getVisibilityStateEntries() {
  const visibilityStateEntries =
    performance.getEntriesByType("visibility-state");
  console.table(visibilityStateEntries);
}
```

### Correlating visibility state changes with paint timing

The below function gets a reference to all `"visibility-state"` entries and the `"first-contentful-paint"` entry, then uses `Array.some()` to test whether any of the `"hidden"` visibility entries occurred before the first contentful paint:

```js
function wasHiddenBeforeFirstContentfulPaint() {
  const fcpEntry = performance.getEntriesByName("first-contentful-paint")[0];
  const visibilityStateEntries =
    performance.getEntriesByType("visibility-state");
  return visibilityStateEntries.some(
    (e) => e.startTime < fcpEntry.startTime && e.name === "hidden",
  );
}
```

## See also

Page Visibility API
