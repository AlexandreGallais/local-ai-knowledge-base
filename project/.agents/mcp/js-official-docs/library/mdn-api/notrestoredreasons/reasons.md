---
title: "NotRestoredReasons: reasons property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/notrestoredreasons/reasons/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# NotRestoredReasons: reasons property

The **`reasons`** read-only property of the
`NotRestoredReasons` interface returns an array of `NotRestoredReasonDetails` objects, each representing a reason why the navigated page was blocked from using the back/forward cache (bfcache).

## Value

An array of `NotRestoredReasonDetails` objects. See Blocking reasons for a list of the possible blocking reasons.

If the document is in a cross-origin ``, `reasons` will return `null`, but the parent document may show a `reason` of `"masked"` if any ``s blocked bfcache usage for the top-level frame.

## Examples

See Monitoring bfcache blocking reasons for examples.

## See also

- Monitoring bfcache blocking reasons
- `PerformanceNavigationTiming.notRestoredReasons`
