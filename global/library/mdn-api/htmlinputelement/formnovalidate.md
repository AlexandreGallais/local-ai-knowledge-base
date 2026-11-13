---
title: "HTMLInputElement: formNoValidate property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlinputelement/formnovalidate/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLInputElement: formNoValidate property

The **`formNoValidate`** property of the `HTMLInputElement` interface is a boolean value indicating if the `<form>` will bypass <example-value> validation when submitted via the ``. It reflects the `` element's `formnovalidate` attribute.

This property is valid only for `submit` and `image` `` elements.

Its value overrides the `noValidate` property of the `HTMLFormElement` interface if the form is submitted via the input. This property can be retrieved or set.

## Value

A boolean.

## Examples

```js
const inputElement = document.getElementById("myInput");
console.log(inputElement.formNoValidate);
```

## See also

- `HTMLInputElement.reportValidity()`
- `HTMLInputElement.checkValidity()`
- `HTMLInputElement.formAction`
- `HTMLInputElement.formEnctype`
- `HTMLInputElement.formMethod`
- `HTMLInputElement.formTarget`
- ``
- ``
- `<form>`
- `HTMLFormElement.noValidate`
- `HTMLButtonElement.formNoValidate`
- Learn: Client-side form validation
- Guide: Constraint validation
