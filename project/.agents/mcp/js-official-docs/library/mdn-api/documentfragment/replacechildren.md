---
title: "DocumentFragment: replaceChildren() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/documentfragment/replacechildren/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DocumentFragment: replaceChildren() method

The **`DocumentFragment.replaceChildren()`** method replaces the
existing children of a `DocumentFragment` with a specified new set of children. These
can be string or `Node` objects.

## Syntax

```js
replaceChildren(param1)
replaceChildren(param1, param2)
replaceChildren(param1, param2, /* …, */ paramN)
```

### Parameters

- `param1`, …, `paramN`
    A set of `Node` objects or strings to replace the
    `DocumentFragment`'s existing children with. If no replacement objects are
    specified, then the `DocumentFragment` is emptied of all child nodes.

### Return value

None (`undefined`).

### Exceptions

- `HierarchyRequestError` `DOMException`
    Thrown when the constraints of the node tree are violated.

## Examples

### Emptying a document fragment

`replaceChildren()` provides a very convenient mechanism for emptying a document fragment
of all its children. You call it on the document fragment without any argument specified:

```js
let fragment = new DocumentFragment();
let div = document.createElement("div");
let p = document.createElement("p");
fragment.append(p);
fragment.prepend(div);

fragment.children; // HTMLCollection [<div>, <p>]

fragment.replaceChildren();

fragment.children; // HTMLCollection []
```

## See also

- `DocumentFragment.prepend()`
- `DocumentFragment.append()`
