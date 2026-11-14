---
title: "HTMLFormElement: requestSubmit() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlformelement/requestsubmit/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLFormElement: requestSubmit() method

The `HTMLFormElement` method **`requestSubmit()`** requests
that the form be submitted using a specific submit button.

## Syntax

```js
requestSubmit()
requestSubmit(submitter)
```

### Parameters

- `submitter` (optional)
    A submit button that is a member of the form.

    If the `submitter` specifies `form*` attributes, they will override the form's submission behavior (e.g., `formmethod="POST"`).

    If the `submitter` has a `name` attribute or is an ``<<input type="image">>``, its data will be included in the form submission (e.g., `btnName=btnValue`).

    If you omit the `submitter` parameter, the form element itself is used as the submitter.

### Return value

None (`undefined`).

### Exceptions

- `TypeError`
    Thrown if the specified `submitter` is not a submit button.
- `NotFoundError` `DOMException`
    Thrown if the specified `submitter` isn't a member of the form on
    which `requestSubmit()` was called. The submitter must be either a
    descendant of the form element or must have a `form`
    attribute referring to the form.

## Usage notes

The obvious question is: Why does this method exist, when we've had the
`submit()` method since the dawn of time?

The answer is simple. `submit()` submits the form, but that's all it
does. `requestSubmit()`, on the other hand, acts as if a submit button were
clicked. The form's content is validated, and the form is submitted only if validation
succeeds. Once the form has been submitted, the
`submit` event is sent back to the form
object.

## Examples

In the example below, the form is submitted by attempting to send the request using
`requestSubmit()` if it's available. If a submit button with the
ID `main-submit` is found, that's used to submit the form. Otherwise, the
form is submitted with no `submitter` parameter, so it's submitted directly
by the form itself.

If, on the other hand, `requestSubmit()` isn't available, this code falls
back to calling the form's `submit()` method.

```js
let myForm = document.querySelector("form");
let submitButton = myForm.querySelector("#main-submit");

if (myForm.requestSubmit) {
  if (submitButton) {
    myForm.requestSubmit(submitButton);
  } else {
    myForm.requestSubmit();
  }
} else {
  myForm.submit();
}
```
