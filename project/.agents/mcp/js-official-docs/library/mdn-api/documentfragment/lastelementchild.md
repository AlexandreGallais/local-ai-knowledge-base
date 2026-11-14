---
title: "DocumentFragment: lastElementChild property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/documentfragment/lastelementchild/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DocumentFragment: lastElementChild property

The **`DocumentFragment.lastElementChild`** read-only property
returns the document fragment's last child `Element`, or `null` if there
are no child elements.

## Value

An `Element` that is the last child `Element` of the object, or `null` if there are none.

## Examples

```js
let fragment = new DocumentFragment();
fragment.lastElementChild; // null

let paragraph = document.createElement("p");
fragment.appendChild(paragraph);

fragment.lastElementChild; // <p>
```

## See also

- `Element.lastElementChild`
