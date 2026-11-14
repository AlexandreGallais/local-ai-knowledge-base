---
title: "Document: children property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/document/children/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Document: children property

The read-only **`children`** property returns a live `HTMLCollection`
which contains all of the child `elements` of the document upon which it was called.

For HTML documents, this is usually only the root `<html>` element.

See `Element.children` for child elements of specific HTML elements within the document.

## Value

An `HTMLCollection` which is a live, ordered collection of the DOM
elements which are children of the current document. You can access the
individual child nodes in the collection by using either the
`item()` method on the collection, or by using
JavaScript array-style notation.

If the document has no element children, then `children` is an empty list with a
`length` of `0`.

## Examples

```js
document.children;
// HTMLCollection [<html>]
// Usually only contains the root <html> element, the document's only direct child
```

See `Element.children` for child elements of specific HTML elements within the document.

## See also

- `Element.children`
- `Node.childNodes`
