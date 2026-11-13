---
title: "DocumentFragment: append() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/documentfragment/append/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DocumentFragment: append() method

The **`DocumentFragment.append()`** method
inserts a set of `Node` objects or strings after
the last child of the document fragment. Strings
are inserted as equivalent `Text` nodes.

This method appends a child to a `DocumentFragment`. To append to an arbitrary element in the tree, see `Element.append()`.

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

### Appending an element to a document fragment

```js
let fragment = new DocumentFragment();
let div = document.createElement("div");
fragment.append(div);

fragment.children; // HTMLCollection [<div>]
```

## See also

- `DocumentFragment.prepend()`
- `Element.append()`
