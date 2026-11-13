---
title: "NodeIterator"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/nodeiterator/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# NodeIterator

The **`NodeIterator`** interface represents an iterator to traverse nodes of a DOM subtree in document order.

A `NodeIterator` can be created using the `Document.createNodeIterator()` method, as follows:

```js
const nodeIterator = document.createNodeIterator(root, whatToShow, filter);
```

## Instance properties

_This interface doesn't inherit any property._

- `NodeIterator.root` (read-only)
    Returns a `Node` representing the root node, as specified when the
    `NodeIterator` was created.
- `NodeIterator.whatToShow` (read-only)
    Returns an `unsigned long` bitmask that describes the types of `Node`
    to be matched. Non-matching nodes are skipped, but relevant child nodes may be included.
- `NodeIterator.filter` (read-only)
    Returns a `NodeFilter` used to select the relevant nodes.
- `NodeIterator.referenceNode` (read-only)
    Returns the `Node` to which the iterator is anchored.
- `NodeIterator.pointerBeforeReferenceNode` (read-only)
    Returns a boolean indicating whether or not the `NodeIterator` is anchored _before_ the `NodeIterator.referenceNode`. If `false`, it indicates that the iterator is anchored _after_ the reference node.

## Instance methods

_This interface doesn't inherit any method._

- `NodeIterator.detach()` (deprecated)
    This is a legacy method, and no longer has any effect. Previously it served to mark a
    `NodeIterator` as disposed, so it could be reclaimed by garbage collection.
- `NodeIterator.previousNode()`
    Returns the previous `Node` in the document, or `null` if there are none.
- `NodeIterator.nextNode()`
    Returns the next `Node` in the document, or `null` if there are none.

## See also

- The creator method: `Document.createNodeIterator()`.
- Related interface: `TreeWalker`
