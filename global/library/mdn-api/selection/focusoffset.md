---
title: "Selection: focusOffset property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/selection/focusoffset/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Selection: focusOffset property

The **`Selection.focusOffset`** read-only property returns the
number of characters that the selection's focus is offset within the
`Selection.focusNode` if said node is of type `Text`, `CDATASection` or `Comment`.

In the case of `Selection.focusNode` being another type of node, **`Selection.focusOffset`** returns the number of `Node.childNodes` the selection's focus is offset within the `Selection.focusNode`.

This number is zero-based. If the selection ends with the first character in the
`Selection.focusNode`, `0` is returned.

## Value

A number.

## See also

- `Selection`, the interface it belongs to.
