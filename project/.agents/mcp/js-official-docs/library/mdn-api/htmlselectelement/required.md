---
title: "HTMLSelectElement: required property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlselectelement/required/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLSelectElement: required property

The **`required`** property of the `HTMLSelectElement` interface specifies that the user must select an option with a non-empty string value before submitting a form. It reflects the `<select>` element's `required` attribute.

## Value

A boolean.

## Examples

```js
const selectElement = document.getElementById("fruits");
console.log(selectElement.required);
```

## See also

- `<select>`
- `HTMLSelectElement.validity`
- `:required` pseudo-class
