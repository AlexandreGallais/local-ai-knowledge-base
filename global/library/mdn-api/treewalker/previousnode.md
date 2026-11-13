---
title: "TreeWalker: previousNode() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/treewalker/previousnode/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TreeWalker: previousNode() method

The **`TreeWalker.previousNode()`** method moves the current
`Node` to the previous _visible_ node in the document order, and
returns the found node. If no such node
exists, or if it is before that the _root node_ defined at the object
construction, it returns `null` and the current node is not changed.

## Syntax

```js
previousNode()
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
const node = treeWalker.previousNode(); // returns null as there is no parent
```

## See also

- The `TreeWalker` interface it belongs to.
