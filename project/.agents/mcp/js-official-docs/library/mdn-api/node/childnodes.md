---
title: "Node: childNodes property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/node/childnodes/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Node: childNodes property

The read-only **`childNodes`** property of the `Node` interface returns a live
`NodeList` of child `nodes` of the given element where
the first child node is assigned index `0`. Child nodes include elements, text and
comments.

> **Note:**
> The `NodeList` being live means that its content is changed each time
> new children are added or removed.
>
> Browsers insert text nodes into a document to represent whitespace in the source markup.
> Therefore a node obtained, for example, using `Node.childNodes[0]`
> may refer to a whitespace text node rather than the actual element the author intended to get.
>
> See Working with whitespace in the DOM for more information.

The items in the collection of nodes are objects, not strings. To get data from node
objects, use their properties. For example, to get the name of the first
childNode, you can use `elementNodeReference.childNodes[0].nodeName`.

The `document` object itself has two children: the Doctype declaration and the
root element, typically referred to as `documentElement`. In HTML
documents the latter is the `<html>` element.

It is important to keep in mind that `childNodes` includes _all_ child nodes,
including non-element nodes like text and comment.
To get a collection containing only elements, use `Element.children` instead.

## Value

A live `NodeList` containing the children of the node.

> **Note:**
> Several calls to `childNodes` return the _same_ `NodeList`.

## Examples

### Simple usage

```js
// Note that para is an object reference to a <p> element

// First check that the element has child nodes
if (para.hasChildNodes()) {
  let children = para.childNodes;

  for (const node of children) {
    // Do something with each child as children[i]
    // NOTE: List is live! Adding or removing children will change the list's `length`
  }
}
```

### Remove all children from a node

```js
// This is one way to remove all children from a node
// box is an object reference to an element
while (box.firstChild) {
  // The list is LIVE so it will re-index each call
  box.removeChild(box.firstChild);
}
```

## See also

- `Node.firstChild`
- `Node.lastChild`
- `Node.nextSibling`
- `Node.previousSibling`
- `Element.children`
