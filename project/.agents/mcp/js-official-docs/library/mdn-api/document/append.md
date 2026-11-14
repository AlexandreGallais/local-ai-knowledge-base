---
title: "Document: append() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/document/append/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Document: append() method

The **`Document.append()`** method
inserts a set of `Node` objects or strings after
the last child of the document. Strings
are inserted as equivalent `Text` nodes.

This method appends a child to a `Document`. To append to an arbitrary element in the tree, see `Element.append()`.

## Syntax

```js
append(param1)
append(param1, param2)
append(param1, param2, /* …, */ paramN)
```

### Parameters

- `param1`, …, `paramN`
    A set of `Node` objects or strings to insert.

### Return value

None (`undefined`).

### Exceptions

- `HierarchyRequestError` `DOMException`
    Thrown when the node cannot be inserted at the specified point in the hierarchy.

## Examples

### Appending a root element to a document

If you try to append an element to an existing HTML document,
it might throw a `HierarchyRequestError` `DOMException` given a `<html>` element already exists.

```js
let html = document.createElement("html");
document.append(html);
// HierarchyRequestError: The operation would yield an incorrect node tree.
```

If you are creating a new document without any existing element, you can append a root HTML element (or a root SVG element):

```js
let doc = new Document();
let html = document.createElement("html");
doc.append(html);

doc.children; // HTMLCollection [<html>]
```

## See also

- `Document.prepend()`
- `Element.append()`
