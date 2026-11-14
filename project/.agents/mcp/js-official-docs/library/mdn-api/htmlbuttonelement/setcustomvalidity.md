---
title: "HTMLButtonElement: setCustomValidity() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlbuttonelement/setcustomvalidity/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLButtonElement: setCustomValidity() method

The **`setCustomValidity()`** method of the `HTMLButtonElement` interface sets the custom validity message for the `` element. Use the empty string to indicate that the element does _not_ have a custom validity error.

Some `` elements are not candidates for constraint validation (see `HTMLButtonElement.willValidate`). For these buttons, the `reportValidity()` method will not cause the custom error message to be displayed to the user, but does set the `customError` property of the element's `ValidityState` object to `true` and the `valid` property to `false`. Use `HTMLButtonElement.willValidate` to check whether a button participates in constraint validation.

## Syntax

```js
setCustomValidity(string)
```

### Parameters

- `string`
    The string containing the error message. The empty string removes any custom validity errors.

### Return value

None (`undefined`).

## Examples

```js
const errorButton = document.getElementById("checkErrors");
const errors = issuesToReport();
if (errors) {
  errorButton.setCustomValidity("There is an error");
} else {
  errorButton.setCustomValidity("");
}
```

## See also

- ``
- `HTMLButtonElement`
- `HTMLButtonElement.validity`
- `HTMLButtonElement.checkValidity()`
- `HTMLButtonElement.reportValidity()`
- Form validation.
- Learn: Client-side form validation
- Guide: Constraint validation
- CSS `:valid` and `:invalid` pseudo-classes
