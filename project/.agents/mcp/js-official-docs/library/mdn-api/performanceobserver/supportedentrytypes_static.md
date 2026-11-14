---
title: "PerformanceObserver: supportedEntryTypes static property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/performanceobserver/supportedentrytypes_static/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PerformanceObserver: supportedEntryTypes static property

The static **`supportedEntryTypes`** read-only property of the `PerformanceObserver` interface returns an array of the `entryType` values supported by the user agent.

As the list of supported entries varies per browser and is evolving, this property allows web developers to check which are available.

## Value

An array of `PerformanceEntry.entryType` values.

## Examples

### Using the console to check supported types

To find out which `entryType` values a browser supports, enter `PerformanceObserver.supportedEntryTypes` into the console. This will return an array of supported values.

```js
PerformanceObserver.supportedEntryTypes;

// returns ["element", "event", "first-input", "largest-contentful-paint", "layout-shift", "long-animation-frame", "longtask", "mark", "measure", "navigation", "paint", "resource", "visibility-state"] in the main thread in Chrome 129
// returns ["mark", "measure", "resource"] in a worker thread in Chrome 129
```

### Checking for unsupported types

The following function checks for support of an array of possible entry types. The unsupported types are logged to the console, however this information could be logged to client-side analytics to indicate that the particular type could not be observed.

```js
function detectSupport(entryTypes) {
  for (const entryType of entryTypes) {
    if (!PerformanceObserver.supportedEntryTypes.includes(entryType)) {
      console.log(entryType);
    }
  }
}

detectSupport(["resource", "mark", "first-input", "largest-contentful-paint"]);
```
