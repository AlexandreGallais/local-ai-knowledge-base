---
title: "NodeIterator: previousNode() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/nodeiterator/previousnode/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# NodeIterator: previousNode() method

The **`NodeIterator.previousNode()`** method returns the
previous node in the set represented by the `NodeIterator` and moves the
position of the iterator backwards within the set.

This method returns `null` when the current node is the first node in the
set.

In old browsers, as specified in old versions of the specifications, the method may
throws the `INVALID_STATE_ERR` `DOMException` if this method
is called after the `NodeIterator.detach()` method. Recent browsers never
throw.

## Syntax

```js
previousNode()
```

### Parameters

None.

### Return value

A `Node` representing the node before the current node in the set represented by this `NodeIterator`, or `null` if the current node is the first node in the set.

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
previousNode = nodeIterator.previousNode(); // same result, since we backtracked to the previous node
```

## See also

- The interface it belongs to: `NodeIterator`.
