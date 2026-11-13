---
title: "Selection: anchorOffset property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/selection/anchoroffset/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Selection: anchorOffset property

The **`Selection.anchorOffset`** read-only property returns the
number of characters that the selection's anchor is offset within the
`Selection.anchorNode` if said node is of type `Text`, `CDATASection` or `Comment`.

In the case of `Selection.anchorNode` being another type of node, **`Selection.anchorOffset`** returns the number of `Node.childNodes` the selection's anchor is offset within the `Selection.anchorNode`.

This number is zero-based. If the selection begins with the first character in the
`Selection.anchorNode`, `0` is returned.

## Value

A number.

## See also

- `Selection`, the interface it belongs to.
