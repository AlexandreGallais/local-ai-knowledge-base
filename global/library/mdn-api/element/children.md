---
title: "Element: children property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/children/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: children property

The read-only **`children`** property returns a live `HTMLCollection`
which contains all of the child `elements` of the element upon which it was called.

`Element.children` includes only element nodes. To get all child nodes, including non-element nodes like text and comment nodes, use `Node.childNodes`.

## Value

An `HTMLCollection` which is a live, ordered collection of the DOM
elements which are children of `node`. You can access the
individual child nodes in the collection by using either the
`item()` method on the collection, or by using
JavaScript array-style notation.

If the element has no element children, then `children` is an empty list with a
`length` of `0`.

## Examples

```js
const myElement = document.getElementById("foo");
for (const child of myElement.children) {
  console.log(child.tagName);
}
```

## See also

- `Node.childNodes`
