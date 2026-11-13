---
title: "HTMLOutputElement: validationMessage property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmloutputelement/validationmessage/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLOutputElement: validationMessage property

The **`validationMessage`** read-only property of the `HTMLOutputElement` interface returns a string representing a localized message that describes the validation constraints that the `<output>` control does not satisfy (if any). This is the empty string as `<output>` elements are not candidates for constraint validation (`HTMLOutputElement.willValidate` is `false`).

## Value

The empty string, `""`;

## See also

- `<output>`
- `HTMLOutputElement`
- `HTMLOutputElement.willValidate`
- `HTMLOutputElement.validity`
- `HTMLOutputElement.checkValidity()`
- `HTMLOutputElement.reportValidity()`
- `HTMLOutputElement.setCustomValidity()`
- Learn: Client-side form validation
- Guide: Constraint validation
- CSS `:valid` and `:invalid` pseudo-classes
