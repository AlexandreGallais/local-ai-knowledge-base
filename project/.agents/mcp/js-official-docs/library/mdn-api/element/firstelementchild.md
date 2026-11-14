---
title: "Element: firstElementChild property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/firstelementchild/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: firstElementChild property

The **`Element.firstElementChild`** read-only property
returns an element's first child `Element`, or `null` if there
are no child elements.

`Element.firstElementChild` includes only element nodes.
To get all child nodes, including non-element nodes like text and comment nodes, use `Node.firstChild`.

## Value

An `Element` object, or `null`.

## Examples

```html
<ul id="list">
  <li>First (1)</li>
  <li>Second (2)</li>
  <li>Third (3)</li>
</ul>
```

```js
const list = document.getElementById("list");
console.log(list.firstElementChild.textContent);
// logs "First (1)"
```

## See also

- `Element.nextElementSibling`
- `Element.lastElementChild`
