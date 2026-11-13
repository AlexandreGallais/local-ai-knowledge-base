---
title: "PerformanceNavigation"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/performancenavigation/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PerformanceNavigation

The legacy **`PerformanceNavigation`** interface represents information about how the navigation to the current document was done.

> **Warning:**
> This interface is deprecated in the Navigation Timing Level 2 specification.
> Please use the `PerformanceNavigationTiming` interface instead.

An object of this type can be obtained by calling the `Performance.navigation` read-only attribute.

## Instance properties

_The `PerformanceNavigation` interface doesn't inherit any properties._

- `PerformanceNavigation.type` (read-only) (deprecated)
    An `unsigned short` which indicates how the navigation to this page was done. Possible values are:
    - `TYPE_NAVIGATE` (0)
        The page was accessed by following a link, a bookmark, a form submission, or a script, or by typing the URL in the address bar.
    - `TYPE_RELOAD` (1)
        The page was accessed by clicking the Reload button or via the `Location.reload()` method.
    - `TYPE_BACK_FORWARD` (2)
        The page was accessed by navigating into the history.
    - `TYPE_RESERVED` (255)
        Any other way.

- `PerformanceNavigation.redirectCount` (read-only) (deprecated)
    An `unsigned short` representing the number of REDIRECTs done before reaching the page.

## Instance methods

_The `PerformanceNavigation` interface doesn't inherit any methods._

- `PerformanceNavigation.toJSON()` (deprecated)
    Returns a JSON-serializable plain object representing the `PerformanceNavigation` object. Automatically called by `JSON.stringify()`.

## See also

- The `Performance` that allows access to an object of this type.
- `PerformanceNavigationTiming` (part of Navigation Timing Level 2) that has superseded this API.
