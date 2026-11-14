---
title: "HTMLFormElement: noValidate property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlformelement/novalidate/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLFormElement: noValidate property

The **`noValidate`** property of the `HTMLFormElement` interface is a boolean value indicating if the `<form>` will bypass <example-value> validation when submitted. It reflects the `<form>` element's `novalidate` attribute; if the attribute present, the value is `true`.

If this attribute is not set or the value is set to `false`, the form is validated. This can be overridden by setting the `HTMLInputElement.formNoValidate` or `HTMLButtonElement.formNoValidate` property to `true`, either via JavaScript or the HTML `formnovalidate` attribute, for the control used to submit the form.

This property can be retrieved or set.

## Value

A boolean.

## Examples

```js
const element = document.getElementById("myForm");
console.log(element.noValidate);
```

## See also

- `HTMLFormElement.reportValidity()`
- `HTMLFormElement.checkValidity()`
- `HTMLFormElement.action`
- `HTMLFormElement.enctype`
- `HTMLFormElement.method`
- `HTMLFormElement.target`
- `<form>`
- Learn: Client-side form validation
- Guide: Constraint validation
