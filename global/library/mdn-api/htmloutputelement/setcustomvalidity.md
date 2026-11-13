---
title: "HTMLOutputElement: setCustomValidity() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmloutputelement/setcustomvalidity/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLOutputElement: setCustomValidity() method

The **`setCustomValidity()`** method of the `HTMLOutputElement` interface sets the custom validity message for the `<output>` element. Use the empty string to indicate that the element does _not_ have a custom validity error.

The `<output>` element is not a candidate for constraint validation. The `reportValidity()` method will not cause the custom error message to be displayed to the user, but does set the `customError` property of the element's `ValidityState` object to `true` and the `valid` property to `false`.

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

In this example, if the `<output>`'s `value` is not a non-zero number, we set a custom error message. If it is a number, we set the custom error to an empty string:

```js
const cart = document.getElementById("cart-form");
const total = cart.elements("total");
if (parseFloat(total.value)) {
  errorOutput.setCustomValidity("");
} else {
  errorOutput.setCustomValidity("There is an error");
}
```

## See also

- `<output>`
- `HTMLOutputElement`
- `HTMLOutputElement.validity`
- `HTMLOutputElement.checkValidity()`
- `HTMLOutputElement.reportValidity()`
- Form validation.
- Learn: Client-side form validation
- Guide: Constraint validation
- CSS `:valid` and `:invalid` pseudo-classes
