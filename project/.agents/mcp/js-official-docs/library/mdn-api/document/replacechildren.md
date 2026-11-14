---
title: "Document: replaceChildren() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/document/replacechildren/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Document: replaceChildren() method

The **`Document.replaceChildren()`** method replaces the
existing children of a `Document` with a specified new set of children.

## Syntax

```js
replaceChildren(param1)
replaceChildren(param1, param2)
replaceChildren(param1, param2, /* …, */ paramN)
```

### Parameters

- `param1`, …, `paramN`
    A set of `Node` objects or strings to replace the
    `Document`'s existing children with. If no replacement objects are
    specified, then the `Document` is emptied of all child nodes.

### Return value

None (`undefined`).

### Exceptions

- `HierarchyRequestError` `DOMException`
    Thrown if the constraints of the node tree are violated.

## Examples

### Emptying a document

`replaceChildren()` provides a very convenient mechanism for emptying a document
of all its children. You call it on the document without any argument specified:

```js
document.replaceChildren();
document.children; // HTMLCollection []
```

## See also

- `Document.prepend()`
- `Document.append()`
