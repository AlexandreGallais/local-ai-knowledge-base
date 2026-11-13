---
title: "Performance: navigation property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/performance/navigation/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Performance: navigation property

The legacy
**`Performance.navigation`**
read-only property returns a `PerformanceNavigation` object representing
the type of navigation that occurs in the given browsing context, such as the number of
redirections needed to fetch the resource.

This property is not available in workers.

> **Warning:**
> This property is deprecated in the Navigation Timing Level 2 specification. Please use the
> `PerformanceNavigationTiming` interface instead.

## Value

A `PerformanceNavigation` object.

## See also

- The `Performance` interface it belongs to.
