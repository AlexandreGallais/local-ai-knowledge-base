---
title: "HTMLButtonElement: validity property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlbuttonelement/validity/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLButtonElement: validity property

The **`validity`** read-only property of the `HTMLButtonElement` interface returns a `ValidityState` object that represents the validity states this element is in.

## Value

A `ValidityState` object.

## Examples

The following example demonstrates that a `` is in an invalid state when a `customError` is set; in this state, the `validityState`'s `valid` property is `false`, while `checkValidity()` returns `true` if the button's `type` is not `"submit"`, because such buttons are not candidates for constraint validation.

```js
const button = document.getElementById("myButton");
button.setCustomValidity("This button is invalid.");
const validityState = button.validity;
console.log(validityState.valid); // false
console.log(validityState.customError); // true
console.log(button.checkValidity()); // false if the button is of the "submit" type, true otherwise
```

## See also

- `HTMLButtonElement.checkValidity()`
- ``
- `<form>`
- Learn: Client-side form validation
- Guide: Constraint validation
