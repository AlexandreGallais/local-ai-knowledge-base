---
title: "TreeWalker: lastChild() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/treewalker/lastchild/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TreeWalker: lastChild() method

The **`TreeWalker.lastChild()`** method moves the current
`Node` to the last _visible_ child of the current node, and returns
the found child. If no such child exists, it returns `null` and the current node is not changed.

## Syntax

```js
lastChild()
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
);
const node = treeWalker.lastChild(); // returns the last visible child of the root element
```

## See also

- The `TreeWalker` interface it belongs to.
