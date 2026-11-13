---
title: "NotRestoredReasonDetails"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/notrestoredreasondetails/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# NotRestoredReasonDetails

The **`NotRestoredReasonDetails`** interface of the `Performance API` represents a single reason why a navigated page was blocked from using the back/forward cache (bfcache).

An array of `NotRestoredReasonDetails` objects can be accessed via the `NotRestoredReasons.reasons` property.

## Instance properties

- `reason` (read-only) (experimental)
    A string describing a reason that the page was blocked from using the back/forward cache.

## Instance methods

- `toJSON()` (experimental)
    Returns a JSON-serializable plain object representing the `NotRestoredReasonDetails` object. Automatically called by `JSON.stringify()`.

## Examples

See Monitoring bfcache blocking reasons for examples.

## See also

- Monitoring bfcache blocking reasons
- `PerformanceNavigationTiming.notRestoredReasons`
