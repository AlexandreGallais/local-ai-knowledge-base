---
title: "DocumentFragment: children property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/documentfragment/children/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DocumentFragment: children property

The read-only **`children`** property returns a live `HTMLCollection`
which contains all of the child `elements` of the document fragment upon which it was called.

## Value

An `HTMLCollection` which is a live, ordered collection of the DOM
elements which are children of the document fragment. You can access the
individual child nodes in the collection by using either the
`item()` method on the collection, or by using
JavaScript array-style notation.

If the document fragment has no element children, then `children` is an empty list with a
`length` of `0`.

## Examples

```js
let fragment = new DocumentFragment();
fragment.children; // HTMLCollection []

let paragraph = document.createElement("p");
fragment.appendChild(paragraph);

fragment.children; // HTMLCollection [<p>]
```

## See also

- `Node.childNodes`
