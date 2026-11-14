---
title: "PerformanceSoftNavigation: navigationType property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/performancesoftnavigation/navigationtype/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PerformanceSoftNavigation: navigationType property

The **`navigationType`** read-only property of the `PerformanceSoftNavigation` interface returns the type of the soft navigation — `push`, `reload`, `replace`, or `traverse`.

This returns the same types as `NavigateEvent.navigationType`.

## Value

An enumerated value representing the type of navigation.

The possible values are:

- `push`
    A new location is navigated to, causing a new entry to be pushed onto the history list.
- `reload`
    The `Navigation.currentEntry` is reloaded.
- `replace`
    The `Navigation.currentEntry` is replaced with a new history entry. This new entry will reuse the same `key`, but be assigned a different `id`.
- `traverse`
    The browser navigates from one existing history entry to another existing history entry.

## Examples

### Logging the navigation type of the soft navigation

This example uses a `PerformanceObserver` to log new `soft-navigation` performance entries as they are recorded in the browser's performance timeline. The `buffered` option is used to access entries from before the observer creation.

```js
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    console.log("Soft Nav:", entry.startTime, entry.navigationType);
  }
});
observer.observe({ type: "soft-navigation", buffered: true });
```
