---
title: "TreeWalker: previousSibling() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/treewalker/previoussibling/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TreeWalker: previousSibling() method

The **`TreeWalker.previousSibling()`** method moves the current
`Node` to its previous sibling, if any, and returns the found sibling. If
there is no such node, it returns `null` and the current node is not changed.

## Syntax

```js
previousSibling()
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
const node = treeWalker.previousSibling(); // returns null as there is no previous sibling
```

## See also

- The `TreeWalker` interface it belongs to.
