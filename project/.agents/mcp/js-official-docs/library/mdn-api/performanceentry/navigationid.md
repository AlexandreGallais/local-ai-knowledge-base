---
title: "PerformanceEntry: navigationId property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/performanceentry/navigationid/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PerformanceEntry: navigationId property

The **`navigationId`** read-only property of the `PerformanceEntry` interface returns the ID of the navigation that this paint happened under.

## Value

An integer that can be matched to a corresponding `PerformanceNavigationTiming` or `PerformanceSoftNavigation` entry.

## Description

Using `PerformanceSoftNavigation` entries, you can measure when Soft Navigations happened without hooking into the code that made the soft navigation.

This enables slicing the performance timeline used by the performance APIs to attribute performance measures to the navigation they occurred under. As performance entries are emitted after the fact and may be delayed, they may relate to previous navigations; you cannot assume they relate to the current URL. The `navigationId` indicates which navigation the entry happened under.

### `navigationId` and measuring soft navigation Largest Contentful Paints

During Soft Navigations, paints that happen before the URL is updated will have a `navigationId` that references the location being _navigated from_. When measuring the Largest Contentful Paint (LCP) of an in-flight soft navigation, you will likely want to associate it with the location being _navigated to_. For the LCP case, `PerformanceSoftNavigation.getLargestInteractionContentfulPaint()` and `InteractionContentfulPaint.interactionId` are more effective at considering all relevant paints regardless of the `navigationId` when calculating that metric.

## Examples

### Logging the `navigationId` of the soft navigation

This example uses a `PerformanceObserver` to log new `soft-navigation` performance entries as they are recorded in the browser's performance timeline. The `buffered` option is used to access entries from before the observer creation.

```js
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    console.log("Soft Nav:", entry.startTime, entry.navigationId);
  }
});
observer.observe({ type: "soft-navigation", buffered: true });
```
