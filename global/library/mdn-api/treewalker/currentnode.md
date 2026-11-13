---
title: "TreeWalker: currentNode property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/treewalker/currentnode/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TreeWalker: currentNode property

The **`TreeWalker.currentNode`** property represents the
`Node` which the `TreeWalker` is currently pointing at.

## Value

A `Node`.

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
root = treeWalker.currentNode; // the root element as it is the first element!
```

## See also

- The `TreeWalker` interface.
