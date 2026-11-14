---
title: "HTMLInputElement: validationMessage property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlinputelement/validationmessage/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLInputElement: validationMessage property

The **`validationMessage`** read-only property of the `HTMLInputElement` interface returns a string representing a localized message that describes the validation constraints that the `` control does not satisfy (if any).

If the `` element is not a candidate for constraint validation (`HTMLInputElement.willValidate` is `false`), or it satisfies its constraints, the value is the empty string (`""`).

If the element is a candidate for constraint validation (`willValidate` is `true`) and the constraints are not met (the `HTMLInputElement.validity` object's `valid` property is `false`), the value is the error message that would be shown to the user during validation.

## Value

A string.

## Example

```js
const input = document.getElementById("myInput");
const errorMessage = input.validationMessage;
```

## See also

- ``
- `HTMLInputElement`
- `HTMLInputElement.willValidate`
- `HTMLInputElement.validity`
- `HTMLInputElement.checkValidity()`
- `HTMLInputElement.reportValidity()`
- `HTMLInputElement.setCustomValidity()`
- Learn: Client-side form validation
- Guide: Constraint validation
- CSS `:valid` and `:invalid` pseudo-classes
