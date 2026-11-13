---
title: "NodeIterator: whatToShow property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/nodeiterator/whattoshow/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# NodeIterator: whatToShow property

The **`NodeIterator.whatToShow`** read-only property represents
an `unsigned integer` representing a bitmask signifying what types of nodes
should be returned by the `NodeIterator`.

## Value

A non-negative integer. For the list of possible values, see `document.createNodeIterator()`.

## Examples

```js
const nodeIterator = document.createNodeIterator(
  document.body,
  NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_COMMENT | NodeFilter.SHOW_TEXT,
  { acceptNode: (node) => NodeFilter.FILTER_ACCEPT },
);
if (
  nodeIterator.whatToShow & NodeFilter.SHOW_ALL ||
  nodeIterator.whatToShow & NodeFilter.SHOW_COMMENT
) {
  // nodeIterator will show comments
}
```

## See also

- The interface this property belongs to: `NodeIterator`.
