---
title: "Node: contains() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/node/contains/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Node: contains() method

The **`contains()`** method of the `Node` interface
returns a boolean value indicating
whether a node is a descendant of a given node, that is the node itself,
one of its direct children (`childNodes`),
one of the children's direct children, and so on.

> **Note:**
> A node is _contained_ inside itself.

## Syntax

```js
contains(otherNode)
```

### Parameters

- `otherNode`
    The `Node` to test with.
    > **Note:**
    > `otherNode` is not optional, but can be set to `null`.

### Return value

A boolean value that is `true` if `otherNode` is contained in the node,
`false` if not.

If the `otherNode` parameter is `null`,
`contains()` always returns `false`.

## Example

This function checks to see if an element is in the page's body. As
`contains` is inclusive and determining if the body contains itself isn't the
intention of `isInPage` this case explicitly returns `false`.

```js
function isInPage(node) {
  return node === document.body ? false : document.body.contains(node);
}
```

## See also

- `Node.compareDocumentPosition`
- `Node.hasChildNodes`
