---
title: "TreeWalker: nextSibling() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/treewalker/nextsibling/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TreeWalker: nextSibling() method

The **`TreeWalker.nextSibling()`** method moves the current
`Node` to its next sibling, if any, and returns the found sibling. If there
is no such node, it returns `null` and the current node is not changed.

## Syntax

```js
nextSibling()
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
treeWalker.firstChild();
const node = treeWalker.nextSibling(); // returns null if the first child of the root element has no sibling
```

## See also

- The `TreeWalker` interface it belongs to.
