---
title: "PasswordCredential: PasswordCredential() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/passwordcredential/passwordcredential/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PasswordCredential: PasswordCredential() constructor

The **`PasswordCredential()`** constructor creates a new `PasswordCredential` object.

## Syntax

```js
new PasswordCredential(data)
new PasswordCredential(form)
```

### Parameters

Either of the following:

- `data`
    An object with the following properties:
    - `iconURL` (optional)
        A string representing the URL of an icon or avatar to be associated with the credential.
    - `id`
        A string representing the username portion of the username/password combination.
    - `name` (optional)
        A string representing a human-understandable name associated with the credential, intended to help the user select this credential in a user interface.
    - `origin`
        A string representing the credential's origin. `PasswordCredential` objects are origin-bound, which means that they will only be usable on the specified origin they were intended to be used on.
    - `password`
        A string representing the credential password.

- `form`
    A reference to an `HTMLFormElement` with appropriate input fields.
    The form should, at the very least, contain an id and password.
    It could also require a CSRF token.

### Exceptions

- `TypeError`
    Thrown if one of the `id`, `origin` or `password` option is empty.

## Examples

This example shows how to set up an `HTMLFormElement` to capture data which we'll use to create a `PasswordCredential` object.

Starting with the form element.

```html
<form id="form" method="post">
  <label for="id">Username:</label>
  <input type="text" name="id" autocomplete="username" />
  <label for="<example-value>">Password:</label>
  <input type="<example-value>" name="<example-value>" <example-value>"<example-value>" />
  <input type="<example-value>" name="<example-value>" <example-value>"<example-value>" />
</form>
```

Then, a reference to this form element, using it to create a `PasswordCredential` object, and storing it in the browser's password system.

```js
const form = document.querySelector("#form");
const creds = new PasswordCredential(form);
// Store the credentials.
navigator.credentials.store(creds).then((creds) => {
  // Do something with the credentials if you need to.
});
```
