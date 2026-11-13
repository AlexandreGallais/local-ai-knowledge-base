---
title: "Range"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/range/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Range

The **`Range`** interface represents a fragment of a document that can contain nodes and parts of text nodes.

A range can be created by using the `Document.createRange()` method. Range objects can also be retrieved by using the `getRangeAt()` method of the `Selection` object or the `caretRangeFromPoint()` method of the `Document` object.

There also is the `Range()` constructor available.

## Constructor

- `Range()`
    Returns a `Range` object with the global `Document` as its start and end.

## Instance properties

_Also inherits properties from its parent interface, `AbstractRange`._

- `Range.commonAncestorContainer` (read-only)
    Returns the deepest `Node` that contains the `startContainer` and `endContainer` nodes.

## Instance methods

_There are no inherited methods._

- `Range.collapse()`
    Collapses the `Range` to one of its boundary points.
- `Range.compareBoundaryPoints()`
    Compares the boundary points of the `Range` with another `Range`.
- `Range.compareNode()` (deprecated) (non-standard)
    Returns a constant representing whether the `Node` is before, after, inside, or surrounding the range.
- `Range.comparePoint()`
    Returns -1, 0, or 1 indicating whether the point occurs before, inside, or after the `Range`.
- `Range.cloneContents()`
    Returns a `DocumentFragment` copying the nodes of a `Range`.
- `Range.cloneRange()`
    Returns a `Range` object with boundary points identical to the cloned `Range`.
- `Range.createContextualFragment()`
    Returns a `DocumentFragment` created from a given string of code.
- `Range.deleteContents()`
    Removes the contents of a `Range` from the `Document`.
- `Range.detach()` (deprecated)
    Does nothing. Kept for compatibility.
- `Range.extractContents()`
    Moves contents of a `Range` from the document tree into a `DocumentFragment`.
- `Range.getBoundingClientRect()`
    Returns a `DOMRect` object which bounds the entire contents of the `Range`; this would be the union of all the rectangles returned by `range.getClientRects()`.
- `Range.getClientRects()`
    Returns a list of `DOMRect` objects that aggregates the results of `Element.getClientRects()` for all the elements in the `Range`.
- `Range.isPointInRange()`
    Returns a `boolean` indicating whether the given point is in the `Range`.
- `Range.insertNode()`
    Insert a `Node` at the start of a `Range`.
- `Range.intersectsNode()`
    Returns a `boolean` indicating whether the given node intersects the `Range`.
- `Range.selectNode()`
    Sets the `Range` to contain the `Node` and its contents.
- `Range.selectNodeContents()`
    Sets the `Range` to contain the contents of a `Node`.
- `Range.setEnd()`
    Sets the end position of a `Range`.
- `Range.setStart()`
    Sets the start position of a `Range`.
- `Range.setEndAfter()`
    Sets the end position of a `Range` relative to another `Node`.
- `Range.setEndBefore()`
    Sets the end position of a `Range` relative to another `Node`.
- `Range.setStartAfter()`
    Sets the start position of a `Range` relative to another `Node`.
- `Range.setStartBefore()`
    Sets the start position of a `Range` relative to another `Node`.
- `Range.surroundContents()`
    Moves content of a `Range` into a new `Node`.
- `Range.toString()`
    Returns the text of the `Range`.

## See also

- The DOM interfaces index
