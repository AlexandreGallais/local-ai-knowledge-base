---
title: "NodeIterator: root property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/nodeiterator/root/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# NodeIterator: root property

The **`NodeIterator.root`** read-only property represents the
`Node` that is the root of what the `NodeIterator`
traverses.

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
root = nodeIterator.root; // document.body in this case
```

## See also

- The interface it belongs to: `NodeIterator`.
