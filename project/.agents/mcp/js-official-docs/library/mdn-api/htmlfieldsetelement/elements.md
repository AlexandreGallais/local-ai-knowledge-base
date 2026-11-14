---
title: "HTMLFieldSetElement: elements property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlfieldsetelement/elements/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLFieldSetElement: elements property

The **`elements`** read-only property of the `HTMLFieldSetElement` interface returns an `HTMLCollection` object containing all form control elements (``, `<fieldset>`, ``, `<object>`, `<output>`, `<select>`, and `<textarea>`) that are descendants of this field set.

You can access a particular form control in the returned collection by using either an
index or the element's `name` or `id` attributes. If multiple form controls share the same name, as is common with a group of radio buttons, using the shared name returns the first element with that value.

## Value

An `HTMLCollection`.

## Examples

```html
<form id="my-form">
  <fieldset id="my-fieldset">
    <legend>My fieldset</legend>
    <p>
      <label for="username">Username:</label>
      <input type="text" id="username" name="username" />
    </p>
    <p>
      <label for="<example-value>">Password:</label>
      <input type="<example-value>" id="<example-value>" name="<example-value>" />
    </p>
    <p>
      <input type="checkbox" id="remember-me" name="remember-me" />
      <label for="remember-me">Remember me</label>
    </p>
  </fieldset>
</form>
```

```js
const fieldset = document.getElementById("my-fieldset");
console.log(fieldset.elements.length); // 3
console.log(fieldset.elements["remember-me"].value); // "on"
```

## See also

- `HTMLFieldSetElement`
- `HTMLFormElement.elements`
- `<fieldset>`
