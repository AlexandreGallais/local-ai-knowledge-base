---
title: "TreeWalker: parentNode() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/treewalker/parentnode/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TreeWalker: parentNode() method

The **`TreeWalker.parentNode()`** method moves the current
`Node` to the first _visible_ ancestor node in the document order,
and returns the found node. If no such node exists, or if it is above the
`TreeWalker`'s _root node_, it returns `null` and the current
node is not changed.

## Syntax

```js
parentNode()
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
const node = treeWalker.parentNode(); // returns null as there is no parent
```

## See also

- The `TreeWalker` interface it belongs to.
