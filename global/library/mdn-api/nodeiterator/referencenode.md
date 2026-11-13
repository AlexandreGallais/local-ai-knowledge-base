---
title: "NodeIterator: referenceNode property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/nodeiterator/referencenode/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# NodeIterator: referenceNode property

The **`NodeIterator.referenceNode`** read-only property returns the
`Node` to which the iterator is anchored; as new nodes are inserted, the
iterator remains anchored to the reference node as specified by this property.

## Value

A `Node`.

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
node = nodeIterator.referenceNode;
```

## See also

- The interface it belongs to: `NodeIterator`
