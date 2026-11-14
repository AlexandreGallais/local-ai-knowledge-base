---
title: "NotRestoredReasons: name property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/notrestoredreasons/name/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# NotRestoredReasons: name property

The **`name`** read-only property of the
`NotRestoredReasons` interface returns a string representing the `name` attribute value of the `` the document is contained in (for example ``).

## Value

A string.

If the document is not in an `` or the `` has no `name` set, `name` will return `null`.

## Examples

See Monitoring bfcache blocking reasons for examples.

## See also

- Monitoring bfcache blocking reasons
- `PerformanceNavigationTiming.notRestoredReasons`
