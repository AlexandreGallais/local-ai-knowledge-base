---
title: "HTMLObjectElement: validity property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlobjectelement/validity/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLObjectElement: validity property

The **`validity`** read-only property of the `HTMLObjectElement` interface returns a `ValidityState` object that represents the validity states this element is in. Although `<object>` elements are never candidates for constraint validation, the validity state may still be invalid if a custom validity message has been set.

## Value

A `ValidityState` object.

## Examples

The following example demonstrates that an `<object>` is in an invalid state when a `customError` is set; in this state, `checkValidity()` returns `true` while the `validityState`'s `valid` property is `false`.

```js
const objectElem = document.getElementById("myObjectElm");
objectElem.setCustomValidity("This object element is invalid.");
const validityState = objectElem.validity;
console.log(validityState.valid); // false
console.log(validityState.customError); // true
console.log(objectElem.checkValidity()); // true
```

## See also

- `HTMLObjectElement.checkValidity()`
- `<object>`
- `<form>`
- Learn: Client-side form validation
- Guide: Constraint validation
