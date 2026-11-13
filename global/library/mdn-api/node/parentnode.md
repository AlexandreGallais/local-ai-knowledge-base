---
title: "Node: parentNode property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/node/parentnode/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Node: parentNode property

The read-only **`parentNode`** property of the `Node` interface
returns the parent of the specified node in the DOM tree.

`Document` and `DocumentFragment` nodes can never have a parent, so
`parentNode` will always return `null`.
It also returns `null` if the node has just been created
and is not yet attached to the tree. `Node.parentElement` on the other hand only returns `Element` nodes.

## Value

A `Node` that is the parent of the current node. The parent of an element is
an `Element` node, a `Document` node, or a `DocumentFragment` node.

## Example

### Using parentNode

This example removes a node from the tree, unless it's not in the tree already.

```js
if (node.parentNode) {
  node.parentNode.removeChild(node);
}
```

## See also

- `Node.firstChild`
- `Node.lastChild`
- `Node.childNodes`
- `Node.nextSibling`
- `Node.parentElement`
- `Node.previousSibling`
- `Node.removeChild`
