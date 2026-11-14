---
title: "NodeIterator: detach() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/nodeiterator/detach/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# NodeIterator: detach() method

The **`NodeIterator.detach()`** method is a no-op, kept for
backward compatibility only.

Originally, it detached the `NodeIterator` from the set over which it
iterates, releasing any resources used by the set and setting the iterator's state to
`INVALID`. Once this method had been called, calls to other methods on
`NodeIterator` would raise the `INVALID_STATE_ERR` exception.

## Syntax

```js
detach()
```

### Parameters

None.

### Return value

None (`undefined`).

## Examples

```js
const nodeIterator = document.createNodeIterator(
  document.body,
  NodeFilter.SHOW_ELEMENT,
  {
    acceptNode(node) {
      return NodeFilter.FILTER_ACCEPT;
    },
  },
);
nodeIterator.detach(); // detaches the iterator

nodeIterator.nextNode(); // throws an INVALID_STATE_ERR exception
```

## See also

- The interface it belongs to: `NodeIterator`.
