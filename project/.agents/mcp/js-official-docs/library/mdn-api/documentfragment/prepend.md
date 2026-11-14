---
title: "DocumentFragment: prepend() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/documentfragment/prepend/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DocumentFragment: prepend() method

The **`DocumentFragment.prepend()`** method
inserts a set of `Node` objects or strings before
the first child of the document fragment. Strings
are inserted as equivalent `Text` nodes.

This method prepends a child to a `DocumentFragment`. To prepend to an arbitrary element in the tree, see `Element.prepend()`.

## Syntax

```js
prepend(param1)
prepend(param1, param2)
prepend(param1, param2, /* …, */ paramN)
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

### Prepending an element to a document fragment

```js
let fragment = new DocumentFragment();
let div = document.createElement("div");
let p = document.createElement("p");
fragment.append(p);
fragment.prepend(div);

fragment.children; // HTMLCollection [<div>, <p>]
```

## See also

- `DocumentFragment.append()`
- `Element.prepend()`
