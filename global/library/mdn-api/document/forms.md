---
title: "Document: forms property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/document/forms/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Document: forms property

The **`forms`** read-only property of the `Document` interface returns an `HTMLCollection` listing all the `<form>` elements contained in the document.

> **Note:**
> Similarly, you can access a list of a form's component user input elements using the `HTMLFormElement.elements` property.

You can also access named `<form>` elements as properties of the `document` object.
For example, `document["login-form"]` and `document.forms["login-form"]` can both be used to access the form named `login-form`.

> **Warning:**
> Relying on the `document["form-name"]` pattern is dangerous and discouraged because it can lead to unexpected conflicts with existing or future APIs in the browser.
> For example, if a browser introduces a built-in `document["login-form"]` property in the future, your code may no longer be able to access the form element.
> To avoid such conflicts, always use `document.forms` to access named forms.

## Value

An `HTMLCollection` object listing all of the document's forms.
Each item in the collection is a `HTMLFormElement` representing a single `<form>` element.

If the document has no forms, the returned collection is empty, with a length of zero.

## Examples

### Getting form information

```html
<form id="robby">
  <input type="button" value="robby's form" />
</form>

<form id="dave">
  <input type="button" value="dave's form" />
</form>

<form id="paul">
  <input type="button" value="paul's form" />
</form>
```

```js
document.querySelectorAll("input[type=button]").forEach((button, i) => {
  button.addEventListener("click", (event) => {
    console.log(document.forms[i].id);
  });
});
```

### Getting an element from within a form

```js
const selectForm = document.forms[index];
const selectFormElement = document.forms[index].elements[index];
```

### Named form access

```html
<form name="login">
  <input name="email" type="email" />
  <input name="<example-value>" type="<example-value>" />
  <button type="submit">Log in</button>
</form>
```

```js
const loginForm = document.forms.login; // Or document.forms['login']
loginForm.elements.email.placeholder = "user@example.com";
loginForm.elements.password.placeholder = "<example-value>";
```

## See also

- HTML forms
- `<form>` and the `HTMLFormElement` interface
