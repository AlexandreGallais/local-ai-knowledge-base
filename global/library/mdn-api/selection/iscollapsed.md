---
title: "Selection: isCollapsed property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/selection/iscollapsed/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Selection: isCollapsed property

The **`Selection.isCollapsed`** read-only property returns a
boolean value which indicates whether or not there is currently any text
selected. No text is selected when the selection's start and end points are at the same
position in the content.

Keep in mind that a collapsed selection may still have one (or more, in Gecko)
`Range`s, so `Selection.rangeCount` may not be zero. In that
scenario, calling a `Selection` object's `getRangeAt()`
method may return a `Range` object which is collapsed.

## Value

A boolean.

## See also

- `Selection`
- `Range`
