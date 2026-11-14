---
title: "TreeWalker: nextNode() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/treewalker/nextnode/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TreeWalker: nextNode() method

The **`TreeWalker.nextNode()`** method moves the current
`Node` to the next _visible_ node in the document order, and returns
the found node. If no such node exists, it returns `null` and the current node is not changed.

## Syntax

```js
nextNode()
```

### Parameters

None.

### Return value

A `Node` object or `null`.

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
  false,
);
const node = treeWalker.nextNode(); // returns the first child of root, as it is the next node in document order
```

## See also

- The `TreeWalker` interface it belongs to.
