---
title: "TreeWalker: whatToShow property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/treewalker/whattoshow/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TreeWalker: whatToShow property

The **`TreeWalker.whatToShow`** read-only property returns a
bitmask that indicates the types of
nodes to show. Non-matching nodes are skipped, but their
children may be included, if relevant.

## Value

A non-negative integer. For the list of possible values, see `document.createTreeWalker()`.

## Examples

```js
const treeWalker = document.createTreeWalker(
  document.body,
  NodeFilter.SHOW_ELEMENT + NodeFilter.SHOW_COMMENT + NodeFilter.SHOW_TEXT,
  { acceptNode: (node) => NodeFilter.FILTER_ACCEPT },
  false,
);
if (
  treeWalker.whatToShow === NodeFilter.SHOW_ALL ||
  treeWalker.whatToShow % (NodeFilter.SHOW_COMMENT * 2) >=
    NodeFilter.SHOW_COMMENT
) {
  // treeWalker will show comments
}
```

## See also

- The `TreeWalker` interface.
