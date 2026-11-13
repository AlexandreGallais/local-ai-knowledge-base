---
title: "HTMLSelectElement: multiple property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlselectelement/multiple/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLSelectElement: multiple property

The **`multiple`** property of the `HTMLSelectElement` interface specifies that the user may select more than one option from the list of options. It reflects the `<select>` element's `multiple` attribute.

## Value

A boolean.

## Examples

```js
const selectElement = document.getElementById("comment");
console.log(selectElement.multiple);
```

## See also

- `<select>`
- `HTMLSelectElement.selectedOptions`
- `HTMLSelectElement.length`
- `HTMLSelectElement.selectedIndex`
