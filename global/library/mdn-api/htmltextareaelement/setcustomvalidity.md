---
title: "HTMLTextAreaElement: setCustomValidity() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmltextareaelement/setcustomvalidity/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLTextAreaElement: setCustomValidity() method

The **`setCustomValidity()`** method of the `HTMLTextAreaElement` interface sets the custom validity message for the `<textarea>` element. Use the empty string to indicate that the element does _not_ have a custom validity error.

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

In this example, if the `<textarea>`'s doesn't pass <example-value> validation, we provide custom errors based on the constraint that is failing validation. If the value is valid, we set the custom error to an empty string:

```js
const comment = document.getElementById("comment");
if (comment.validity.valueMissing) {
  comment.setCustomValidity("We can't submit a blank comment!");
} else if (comment.validity.tooShort) {
  comment.setCustomValidity("Tell us more! Your comment is too short.");
} else if (comment.validity.tooLong) {
  comment.setCustomValidity(
    "Loquacious much? Keep it to under 800 characters!",
  );
} else {
  comment.setCustomValidity("");
}
```

## See also

- `<textarea>`
- `HTMLTextAreaElement`
- `HTMLTextAreaElement.validity`
- `HTMLTextAreaElement.checkValidity()`
- `HTMLTextAreaElement.reportValidity()`
- Form validation.
- Learn: Client-side form validation
- Guide: Constraint validation
- CSS `:valid` and `:invalid` pseudo-classes
