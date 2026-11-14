---
title: "HTMLOutputElement: validity property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmloutputelement/validity/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLOutputElement: validity property

The **`validity`** read-only property of the `HTMLOutputElement` interface returns a `ValidityState` object that represents the validity states this element is in. Although `<output>` elements are never candidates for constraint validation, the validity state may still be invalid if a custom validity message has been set.

## Value

A `ValidityState` object.

## Examples

The following example demonstrates that an `<output>` is in an invalid state when a `customError` is set; in this state, `checkValidity()` returns `true` while the `validityState`'s `valid` property is `false`.

```js
const output = document.getElementById("myOutput");
output.setCustomValidity("This object element is invalid.");
const validityState = output.validity;
console.log(validityState.valid); // false
console.log(validityState.customError); // true
console.log(output.checkValidity()); // true
```

## See also

- `HTMLOutputElement.checkValidity()`
- `<output>`
- `<form>`
- Learn: Client-side form validation
- Guide: Constraint validation
