---
title: "DocumentFragment: firstElementChild property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/documentfragment/firstelementchild/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DocumentFragment: firstElementChild property

The **`DocumentFragment.firstElementChild`** read-only property
returns the document fragment's first child `Element`, or `null` if there
are no child elements.

## Value

An `Element` that is the first child `Element` of the object, or `null` if there are none.

## Examples

```js
let fragment = new DocumentFragment();
fragment.firstElementChild; // null

let paragraph = document.createElement("p");
fragment.appendChild(paragraph);

fragment.firstElementChild; // <p>
```

## See also

- `Element.firstElementChild`
