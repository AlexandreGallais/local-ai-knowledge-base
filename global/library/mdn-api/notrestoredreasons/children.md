---
title: "NotRestoredReasons: children property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/notrestoredreasons/children/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# NotRestoredReasons: children property

The **`children`** read-only property of the
`NotRestoredReasons` interface returns an array of `NotRestoredReasons` objects, one for each child `` embedded in the current document, which may contain reasons why the top-level frame was blocked relating to the child frames.

Each object has the same structure as the parent object — this way, any number of levels of embedded ``s can be represented inside the object recursively.

## Value

An array of `NotRestoredReasons` objects.

If the frame has no children, the array will be empty; if the document is in a cross-origin ``, `children` will return `null`.

## Examples

See Monitoring bfcache blocking reasons for examples.

## See also

- Monitoring bfcache blocking reasons
- `PerformanceNavigationTiming.notRestoredReasons`
