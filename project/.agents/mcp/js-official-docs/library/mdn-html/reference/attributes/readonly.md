---
title: "`readonly` HTML attribute"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/attributes/readonly/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `readonly` HTML attribute

The Boolean **`readonly`** attribute, when present, makes the element not mutable, meaning the user cannot edit the control.

```html
<label for="firstName">First Name:</label>
<input id="firstName" name="firstName" type="text" value="Adam" />

<label for="age">Age:</label>
<input id="age" name="age" type="number" value="42" readonly />

<label for="hobbies">Hobbies:</label>
<textarea id="hobbies" name="hobbies" readonly>Baseball</textarea>
```

```css
label {
  display: block;
  margin-top: 1em;
}

input:read-only,
textarea:read-only {
  background-color: silver;
}
```

## Overview

If the `readonly` attribute is specified on an input element, because the user cannot edit the input, the element does not participate in constraint validation.

The `readonly` attribute is supported by textual form controls, including:

- `` elements of type:
  - ``<text>``
  - ``<search>``
  - ``<tel>``
  - ``<url>``
  - ``<email>``
  - ``<password>``
  - ``<date>``
  - ``<month>``
  - ``<week>``
  - ``<time>``
  - ``<datetime-local>``
  - ``<number>``
- `<textarea>`

The attribute is not relevant to all other elements, including `<select>` and ``. It also does not apply to non-textual input elements, including:

- ``<hidden>``
- ``<range>``
- ``<color>``
- ``<checkbox>``
- ``<radio>``
- ``<file>``
- ``<submit>``
- ``<image>``
- ``<reset>``
- ````

Inputs that support the `readonly` attribute but don't have the attribute set match the `:read-write` pseudo-class. All other elements match the `:read-only` pseudo-class.

### Attribute interactions

The difference between `disabled` and `readonly` is that read-only controls can still function and are still focusable, whereas disabled controls cannot receive focus and are not submitted with the form and generally do not function as controls until they are enabled.

Because a read-only field cannot have its value changed by a user interaction, `required` does not have any effect on inputs with the `readonly` attribute also specified.

The only way to modify dynamically the value of the readonly attribute is through a script.

> **Note:**
> The `required` attribute is not permitted on inputs with the `readonly` attribute specified.

### Usability

Browsers display the `readonly` attribute.

### Constraint validation

If the element is read-only, then the element's value cannot be updated by the user, and does not participate in constraint validation.

## Example

### HTML

```html
<div class="group">
  <input type="text" value="Some value" readonly id="text" />
  <label for="text">Text box</label>
</div>
<div class="group">
  <input type="date" value="2020-01-01" readonly id="date" />
  <label for="date">Date</label>
</div>
<div class="group">
  <input type="email" value="Some value" readonly id="email" />
  <label for="email">Email</label>
</div>
<div class="group">
  <input type="<example-value>" <example-value>"<example-value>" readonly id="<example-value>" />
  <label for="<example-value>">Password</label>
</div>
<div class="group">
  <textarea readonly id="ta">Some value</textarea>
  <label for="ta">Message</label>
</div>
```

## See also

- `:read-only` and `:read-write`
- ``
- `<select>`
