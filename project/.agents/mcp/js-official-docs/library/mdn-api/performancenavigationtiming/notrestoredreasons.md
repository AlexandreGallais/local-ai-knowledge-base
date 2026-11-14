---
title: "PerformanceNavigationTiming: notRestoredReasons property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/performancenavigationtiming/notrestoredreasons/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PerformanceNavigationTiming: notRestoredReasons property

The **`notRestoredReasons`** read-only property of the `PerformanceNavigationTiming` interface returns a `NotRestoredReasons` object providing report data on the reasons why the current document was blocked from using the back/forward cache (bfcache) on navigation.

## Value

When the associated `PerformanceNavigationTiming` object represents a history navigation, `notRestoredReasons` returns a `NotRestoredReasons` object.

When the `PerformanceNavigationTiming` object does not represent a history navigation, `notRestoredReasons` will return `null`. This is useful to determine whether bfcache is not relevant to a particular navigation (as opposed to `notRestoredReasons` not being supported, in which case it would return `undefined`).

The `notRestoredReasons` property may return `null` even when the navigation type is reported as back/forward. The circumstances under which this happens include:

- Duplicating a back/forward navigation in a new tab. In such cases, some browsers copy the navigation type from the original tab, but as these are not actually back/forward navigations, `notRestoredReasons` returns `null`.
- Restoring a back/forward navigation tab after a browser restart. Since the bfcache stores fully loaded pages including DOM and JavaScript heap, developers cannot make bfcache survive a full restart. The property therefore returns `null` because there was no bfcache entry to block restoration in the first place.

## Examples

`PerformanceNavigationTiming` data can be obtained from the performance timeline using `Performance.getEntriesByType()` or `PerformanceObserver`.

For example, you could invoke the following function to return all `PerformanceNavigationTiming` objects currently present in the performance timeline and log their `notRestoredReasons`:

```js
function returnNRR() {
  const navEntries = performance.getEntriesByType("navigation");
  for (let i = 0; i < navEntries.length; i++) {
    console.log(`Navigation entry ${i}`);
    let navEntry = navEntries[i];
    console.log(navEntry.notRestoredReasons);
  }
}
```

The `PerformanceNavigationTiming.notRestoredReasons` property returns an object with the following structure, which provides reasons why the current document was blocked from using the bfcache. In this example the top-level frame has no embedded child ``s:

```json
{
  "children": [],
  "id": null,
  "name": null,
  "reasons": [{ "reason": "unload-listener" }],
  "src": "",
  "url": "example.com"
}
```

## See also

- Monitoring bfcache blocking reasons
- `PerformanceResourceTiming`
