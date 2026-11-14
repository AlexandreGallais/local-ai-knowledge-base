---
title: "HTMLSelectElement: name property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlselectelement/name/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLSelectElement: name property

The **`name`** property of the `HTMLSelectElement` interface indicates the name of the `<select>` element. It reflects the element's `name` attribute.

## Value

A string representing the element's name.

## Example

```js
const selectElement = document.querySelector("#planets");
console.log(`Element's name: ${selectElement.name}`);
selectElement.name = "galaxies"; // sets or updates the element's name
```

## See also

- `HTMLSelectElement.value`
- `HTMLSelectElement.selectedIndex`
- `HTMLSelectElement.options`
