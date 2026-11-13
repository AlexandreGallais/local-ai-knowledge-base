---
title: "HTMLFieldSetElement: validity property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlfieldsetelement/validity/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLFieldSetElement: validity property

The **`validity`** read-only property of the `HTMLFieldSetElement` interface returns a `ValidityState` object that represents the validity states this element is in. Although `<fieldset>` elements are never candidates for constraint validation, the validity state may still be invalid if a custom validity message has been set.

> **Note:**
> The `:valid` and `:invalid` CSS pseudo-classes are applied to `<fieldset>` elements based on the validity of its descendant form controls, not the fieldset itself.

## Value

A `ValidityState` object.

## Examples

The following example demonstrates that a `<fieldset>` is in an invalid state when a `customError` is set; in this state, `checkValidity()` returns `true` while the `validityState`'s `valid` property is `false`.

```js
const fieldSet = document.getElementById("myFieldSet");
fieldSet.setCustomValidity("This fieldset is invalid.");
const validityState = fieldSet.validity;
console.log(validityState.valid); // false
console.log(validityState.customError); // true
console.log(fieldSet.checkValidity()); // true
```

> **Note:**
> The `:valid` and `:invalid` CSS pseudo-classes are applied to `<fieldset>` elements based on the validity of its descendant form controls, not the fieldset itself.

## See also

- `HTMLFieldSetElement.checkValidity()`
- `<fieldset>`
- `<form>`
- Learn: Client-side form validation
- Guide: Constraint validation
