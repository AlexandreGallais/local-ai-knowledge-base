---
title: "HTMLButtonElement: validationMessage property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlbuttonelement/validationmessage/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLButtonElement: validationMessage property

The **`validationMessage`** read-only property of the `HTMLButtonElement` interface returns a string representing a localized message that describes the validation constraints that the `` control does not satisfy (if any). This is the empty string if the control is not a candidate for constraint validation (the ``'s `type` is `button` or `reset`), or it satisfies its constraints.

If the `` is a candidate for constraint validation (the `type` is set or defaults to `submit` and `HTMLButtonElement.willValidate` is `true`) and the constraints are not met (there is a non-null `ValidityState.customError`), the value is the error message that would be shown to the user during element validation.

## Value

A string.

## See also

- ``
- `HTMLButtonElement`
- `HTMLButtonElement.willValidate`
- `HTMLButtonElement.validity`
- `HTMLButtonElement.checkValidity()`
- `HTMLButtonElement.reportValidity()`
- `HTMLButtonElement.setCustomValidity()`
- Learn: Client-side form validation
- Guide: Constraint validation
- CSS `:valid` and `:invalid` pseudo-classes
