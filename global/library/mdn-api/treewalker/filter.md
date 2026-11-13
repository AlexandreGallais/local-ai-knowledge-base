---
title: "TreeWalker: filter property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/treewalker/filter/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TreeWalker: filter property

The **`TreeWalker.filter`** read-only property returns the `NodeFilter`
associated with the `TreeWalker`.

When creating the `TreeWalker`, the filter object is passed in as the third
parameter, and its method `acceptNode()` is called on every
single node to determine whether or not to accept it.

## Value

A `NodeFilter` object.

## Examples

```js
const treeWalker = document.createTreeWalker(
  document.body,
  NodeFilter.SHOW_ELEMENT,
  {
    acceptNode(node) {
      return NodeFilter.FILTER_ACCEPT;
    },
  },
);
nodeFilter = treeWalker.filter; // document.body in this case
```

## See also

- The `TreeWalker` interface it belongs to.
