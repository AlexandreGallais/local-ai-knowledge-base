---
title: "Selection: anchorNode property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/selection/anchornode/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Selection: anchorNode property

The **`Selection.anchorNode`** read-only property returns the `Node` in which the selection begins. It can return `null` if selection never existed in the document (e.g., an iframe that was never clicked on, or the node belongs to another document tree).

A user may make a selection from left to right (in document order) or right to left (reverse of document order). The anchor is where the user began the selection. This can be visualized by holding the `Shift` key and pressing the arrow keys on your keyboard. The selection's anchor does not move, but the selection's focus, the other end of the selection, does move.

## Value

A `Node` object or `null`.

## See also

- `Selection`
- `Selection.focusNode`
