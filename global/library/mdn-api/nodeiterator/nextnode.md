---
title: "NodeIterator: nextNode() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/nodeiterator/nextnode/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# NodeIterator: nextNode() method

The **`NodeIterator.nextNode()`** method returns the next node
in the set represented by the `NodeIterator` and advances the position of
the iterator within the set. The first call to `nextNode()` returns the
first node in the set.

This method returns `null` when there are no nodes left in the set.

In old browsers, as specified in old versions of the specifications, the method may
throws the `INVALID_STATE_ERR` `DOMException` if this method
is called after the `NodeIterator.detach()` method. Recent browsers never
throw.

## Syntax

```js
nextNode()
```

### Parameters

None.

### Return value

A `Node` representing the node after the current node in the set represented by this `NodeIterator`, or `null` if the current node is the last node in the set.

## Examples

```js
const nodeIterator = document.createNodeIterator(
  document.body,
  NodeFilter.SHOW_ELEMENT,
  {
    acceptNode(node) {
      return NodeFilter.FILTER_ACCEPT;
    },
  },
);
currentNode = nodeIterator.nextNode(); // returns the next node
```

## See also

- The interface it belongs to: `NodeIterator`.
