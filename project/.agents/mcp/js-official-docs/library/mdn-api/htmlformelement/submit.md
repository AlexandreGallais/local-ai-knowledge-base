---
title: "HTMLFormElement: submit() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlformelement/submit/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLFormElement: submit() method

The **`HTMLFormElement.submit()`** method submits a given
`<form>`.

This method is similar, but not identical to, activating a form's submit
``. When invoking this method directly, however:

- No `submit` event is raised. In particular, the form's `onsubmit` event handler is not run.
- Constraint validation is not triggered.

The `HTMLFormElement.requestSubmit()` method is identical to activating a
form's submit `` and does not have these differences.

A form control (such as a submit button) with a `name` or `id` of `submit` will mask the form's `submit` method. Trying to call `myForm.submit();` throws an error "submit is not a function" because in this case `submit` refers to the form control which has a `name` or `id` of `submit`.

`` with attribute type="submit" will not be submitted with the
form when using **`HTMLFormElement.submit()`**, but it would be
submitted when you do it with original HTML form submit.

## Syntax

```js
submit()
```

### Parameters

None.

### Return value

None (`undefined`).

## Examples

```js
document.forms["my-form"].submit();
```
