---
title: "Selection: focusNode property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/selection/focusnode/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Selection: focusNode property

The **`Selection.focusNode`** read-only property returns the `Node` in which the selection ends. It can return `null` if selection never existed in the document (e.g., an iframe that was never clicked on, or the node belongs to another document tree).

A user may make a selection from left to right (in document order) or right to left (reverse of document order). The focus is where the user ended the selection. This can be visualized by holding the `Shift` key and pressing the arrow keys on your keyboard. The selection's focus moves, but the selection's anchor, the other end of the selection, does not move.

## Value

A `Node` object or `null`.

## See also

- `Selection`
- `Selection.anchorNode`
