---
title: "HTMLFieldSetElement: validationMessage property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlfieldsetelement/validationmessage/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLFieldSetElement: validationMessage property

The **`validationMessage`** read-only property of the `HTMLFieldSetElement` interface returns a string representing a localized message that describes the validation constraints that the `<fieldset>` control does not satisfy (if any). This is the empty string as `<fieldset>` elements are not candidates for constraint validation (`HTMLFieldSetElement.willValidate` is `false`).

## Value

The empty string, `""`;

## See also

- `<fieldset>`
- `HTMLFieldSetElement`
- `HTMLFieldSetElement.willValidate`
- `HTMLFieldSetElement.validity`
- `HTMLFieldSetElement.checkValidity()`
- `HTMLFieldSetElement.reportValidity()`
- `HTMLFieldSetElement.setCustomValidity()`
- Learn: Client-side form validation
- Guide: Constraint validation
- CSS `:valid` and `:invalid` pseudo-classes
