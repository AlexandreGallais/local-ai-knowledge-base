---
title: "DocumentFragment: childElementCount property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/documentfragment/childelementcount/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DocumentFragment: childElementCount property

The **`DocumentFragment.childElementCount`** read-only property
returns the number of child elements of a `DocumentFragment`.

To get the number of children of a specific element, see `Element.childElementCount`.

## Value

A number representing the number of children of the document fragment.

## Examples

```js
let fragment = new DocumentFragment();
fragment.childElementCount; // 0

let paragraph = document.createElement("p");
fragment.appendChild(paragraph);

fragment.childElementCount; // 1
```

## See also

- `Element.childElementCount`
- `Document.childElementCount`
