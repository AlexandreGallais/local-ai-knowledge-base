---
title: "PerformanceNavigation: type property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/performancenavigation/type/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PerformanceNavigation: type property

The legacy
**`PerformanceNavigation.type`**
read-only property returns an `unsigned short` containing a constant
describing how the navigation to this page was done.

> **Warning:**
> This interface of this property is deprecated in the Navigation Timing Level 2 specification.
> Please use the `PerformanceNavigationTiming` interface instead.

## Value

An `unsigned short`.

Possible values are:

       | Value
       | Constant name
       | Meaning

       | `0`
       | `TYPE_NAVIGATE`
       |
        The page was accessed by following a link, a bookmark, a form
        submission, a script, or typing the URL in the address bar.

       | `1`
       | `TYPE_RELOAD`
       |
        The page was accessed by clicking the Reload button or via the
        `Location.reload()` method.

       | `2`
       | `TYPE_BACK_FORWARD`
       | The page was accessed by navigating into the history.

       | `255`
       | `TYPE_RESERVED`
       | Any other way.

> **Note:**
> Historically, developers tested for a `type` of `"TYPE_BACK_FORWARD"` to get an indication of back/forward cache (bfcache) hit rate. This however did not provide any reasons for bfcache blocking, or any other data. The `PerformanceNavigationTiming.notRestoredReasons` property should be used to monitor the bfcache, going forward. See Monitoring bfcache blocking reasons for more information.

## See also

- The `PerformanceNavigation` interface it belongs to.
