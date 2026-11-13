---
title: "NodeIterator: pointerBeforeReferenceNode property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/nodeiterator/pointerbeforereferencenode/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# NodeIterator: pointerBeforeReferenceNode property

The **`NodeIterator.pointerBeforeReferenceNode`** read-only
property returns a boolean flag that indicates whether the
`NodeFilter` is anchored before (if this value is `true`) or
after (if this value is `false`) the anchor node indicated by the
`NodeIterator.referenceNode` property.

## Value

A boolean.

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
flag = nodeIterator.pointerBeforeReferenceNode;
```

## See also

- The interface it belongs to: `NodeIterator`
