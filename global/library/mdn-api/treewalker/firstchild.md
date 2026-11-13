---
title: "TreeWalker: firstChild() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/treewalker/firstchild/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TreeWalker: firstChild() method

The **`TreeWalker.firstChild()`** method moves the current
`Node` to the first _visible_ child of the current node, and returns
the found child. If no such child exists, it returns `null` and the current node is not changed.

## Syntax

```js
firstChild()
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
const node = treeWalker.firstChild(); // returns the first child of the root element, or null if none
```

## See also

- The `TreeWalker` interface it belongs to.
