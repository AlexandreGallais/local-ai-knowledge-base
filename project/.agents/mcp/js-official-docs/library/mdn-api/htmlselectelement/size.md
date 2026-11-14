---
title: "HTMLSelectElement: size property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlselectelement/size/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLSelectElement: size property

The **`size`** property of the `HTMLSelectElement` interface specifies the number of options, or rows, that should be visible at one time. It reflects the `<select>` element's `size` attribute. If omitted, the value is `0`.

> **Note:**
> While by default a `<select>` displays a single row unless `multiple` is true, in which case four rows are displayed, the default value for the `size` property is `0`.

## Value

A number.

## Examples

```js
const selectElement = document.getElementById("fruits");
console.log(selectElement.size);
```

## See also

- `<select>`
- `<option>`
- `HTMLSelectElement.selectedOptions`
- `HTMLSelectElement.length`
