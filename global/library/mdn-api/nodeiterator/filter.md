---
title: "NodeIterator: filter property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/nodeiterator/filter/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# NodeIterator: filter property

The **`NodeIterator.filter`** read-only property returns a
`NodeFilter` object, that is an object which implements an
`acceptNode(node)` method, used to screen nodes.

When creating the `NodeIterator`, the filter object is passed in as the
third parameter, and the object method `acceptNode(node)` is
called on every single node to determine whether or not to accept it. This function
should return the constant `NodeFilter.FILTER_ACCEPT` for cases when the
node should be accepted and `NodeFilter.FILTER_REJECT` for cases when the
node should be rejected.

## Value

A `NodeFilter` object.

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
nodeFilter = nodeIterator.filter;
```

## See also

- The interface this property belongs to: `NodeIterator`.
