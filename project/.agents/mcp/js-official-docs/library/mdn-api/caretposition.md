---
title: "CaretPosition"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/caretposition/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CaretPosition

The `CaretPosition` interface represents the caret position, an indicator for the text insertion point.
You can get a `CaretPosition` using the `Document.caretPositionFromPoint()` method.

## Instance properties

_This interface doesn't inherit any properties._

- `CaretPosition.offsetNode` (read-only)
    Returns a `Node` containing the found node at the caret's position.
- `CaretPosition.offset` (read-only)
    Returns a `long` representing the offset of the selection in the caret position node.
    This will be the character offset in a text node or the selected child node's index in an element node.

## Instance methods

- `CaretPosition.getClientRect`
    Returns the client rectangle for the caret range.

## See also

- `Document.caretPositionFromPoint()`
- `Range`
- `Node`
