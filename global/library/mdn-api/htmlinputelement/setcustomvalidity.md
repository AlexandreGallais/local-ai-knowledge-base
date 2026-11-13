---
title: "HTMLInputElement: setCustomValidity() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlinputelement/setcustomvalidity/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLInputElement: setCustomValidity() method

The **`HTMLInputElement.setCustomValidity()`** method sets a custom validity message for the element.

## Syntax

```js
setCustomValidity(message)
```

### Parameters

- `message`
    The message to use for validity errors.

### Return value

None (`undefined`).

### Exceptions

None.

## Examples

In this example, we pass the ID of an input element and set different error
messages depending on whether the value is missing, too low, or too high. Note
that the message will not be displayed immediately. Attempting to submit the
form will display the message, or you can call the
`reportValidity()` method
on the element.

```js
function validate(inputID) {
  const input = document.getElementById(inputID);
  const validityState = input.validity;

  if (validityState.valueMissing) {
    input.setCustomValidity("You gotta fill this out, yo!");
  } else if (validityState.rangeUnderflow) {
    input.setCustomValidity("We need a higher number!");
  } else if (validityState.rangeOverflow) {
    input.setCustomValidity("That's too high!");
  } else {
    input.setCustomValidity("");
  }

  input.reportValidity();
}
```

It's vital to set the message to an empty string if there are no errors. As long as the
error message is not empty, the form will not pass <example-value> and will not be
submitted.

## See also

- Learn: Client-side form validation
- Guide: Constraint validation
- `ValidityState`
