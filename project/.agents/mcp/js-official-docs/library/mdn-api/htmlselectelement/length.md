---
title: "HTMLSelectElement: length property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlselectelement/length/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLSelectElement: length property

The **`length`** property of the `HTMLSelectElement` interface specifies the number of `<option>` elements in the `<select>` element. It represents the number of nodes in the `options` collection. On setting, it acts as (`HTMLOptionsCollection.length`).

## Value

A number.

## Examples

```js
const selectElement = document.getElementById("fruits");
console.log(selectElement.length);
```

## See also

- `<select>`
- `<option>`
- `HTMLSelectElement.options`
- `HTMLSelectElement.selectedOptions`
- `HTMLSelectElement.multiple`
- `HTMLSelectElement.selectedIndex`
