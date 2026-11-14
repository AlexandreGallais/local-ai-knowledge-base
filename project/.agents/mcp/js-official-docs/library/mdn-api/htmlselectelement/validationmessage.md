---
title: "HTMLSelectElement: validationMessage property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlselectelement/validationmessage/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLSelectElement: validationMessage property

The **`validationMessage`** read-only property of the `HTMLSelectElement` interface returns a string representing a localized message that describes the validation constraints that the `<select>` control does not satisfy (if any). This is the empty string if the control is not a candidate for constraint validation (`HTMLSelectElement.willValidate` is `false`), or it satisfies its constraints.

If the `<select>` element is a candidate for constraint validation (`willValidate` is `true`) and the constraints are not met (the `HTMLSelectElement.validity` object's `valid` property is `false`), the value is the error message that would be shown to the user during validation.

## Value

A string.

## Example

```js
const select = document.getElementById("mySelect");
const errorMessage = select.validationMessage;
```

## See also

- `<select>`
- `HTMLSelectElement`
- `HTMLSelectElement.willValidate`
- `HTMLSelectElement.validity`
- `HTMLSelectElement.checkValidity()`
- `HTMLSelectElement.reportValidity()`
- `HTMLSelectElement.setCustomValidity()`
- Learn: Client-side form validation
- Guide: Constraint validation
- CSS `:valid` and `:invalid` pseudo-classes
