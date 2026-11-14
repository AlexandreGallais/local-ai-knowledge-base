---
title: "HTMLSelectElement: validity property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlselectelement/validity/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLSelectElement: validity property

The **`validity`** read-only property of the `HTMLSelectElement` interface returns a `ValidityState` object that represents the validity states this element is in.

## Value

A `ValidityState` object.

## Example

The following example gets the validity state of a select element and processes it if it is not valid:

```js
const select = document.getElementById("mySelect");
const validityState = select.validity;
if (!validityState.valid) {
  // Test each validity state
}
```

## See also

- `HTMLSelectElement.checkValidity()`
- `<select>`
- `<form>`
- Learn: Client-side form validation
- Guide: Constraint validation
