---
title: "`disabled` HTML attribute"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/attributes/disabled/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `disabled` HTML attribute

The Boolean **`disabled`** attribute, when present, makes the element not mutable, focusable, or even submitted with the form. The user can neither edit nor focus on the control, nor its form control descendants.

```html
<form>
  <label for="name">Name:</label>
  <input id="name" name="name" type="text" />

  <label for="emp">Employed:</label>
  <select id="emp" name="emp" disabled>
    <option>No</option>
    <option>Yes</option>
  </select>

  <label for="empDate">Employment Date:</label>
  <input id="empDate" name="empDate" type="date" disabled />

  <label for="resume">Resume:</label>
  <input id="resume" name="resume" type="file" />
</form>
```

```css
label {
  display: block;
  margin-top: 1em;
}

*:disabled {
  background-color: dimgrey;
  color: linen;
  opacity: 1;
}
```

## Overview

If the `disabled` attribute is specified on a form control, the element and its form control descendants do not participate in constraint validation. Often browsers gray out such controls and it won't receive any browsing events, like mouse clicks or focus-related ones.

The `disabled` attribute is supported by ``, `<fieldset>`, `<optgroup>`, `<option>`, `<select>`, `<textarea>` and ``.

This Boolean disabled attribute indicates that the user cannot interact with the control or its descendant controls. If this attribute is not specified, the control inherits its setting from the containing element, for example `fieldset`; if there is no containing element with the `disabled` attribute set, and the control itself does not have the attribute, then the control is enabled. If declared on an `<optgroup>`, the select is still interactive (unless otherwise disabled), but none of the items in the option group are selectable.

> **Note:**
> If a `<fieldset>` is disabled, the descendant form controls are all disabled, with the exception of form controls within the `<legend>`.

When a supporting element has the `disabled` attribute applied, the `:disabled` pseudo-class also applies to it. Conversely, elements that support the `disabled` attribute but don't have the attribute set match the `:enabled` pseudo-class.

This Boolean attribute prevents the user from interacting with the button. If this attribute isn't set, the button can still be disabled from a containing element, for example `<fieldset>`; if there is no containing element with the `disabled` attribute set, then the button is enabled.

Firefox will, unlike other browsers, persist the dynamic disabled state of a `` across page loads. Use the `autocomplete` attribute to control this feature.

### Attribute interactions

The difference between `disabled` and `readonly` is that read-only controls can still function and are still focusable, whereas disabled controls cannot receive focus and are not submitted with the form and generally do not function as controls until they are enabled.

Because a disabled field cannot have its value changed, `required` does not have any effect on inputs with the `disabled` attribute also specified. Additionally, since the elements become immutable, most other attributes, such as `pattern`, have no effect, until the control is enabled.

> **Note:**
> The `required` attribute is not permitted on inputs with the `disabled` attribute specified.

### Usability

Browsers display disabled form controls grayed as disabled form controls are immutable, won't receive focus or any browsing events, like mouse clicks or focus-related ones, and aren't submitted with the form.

If present on a supporting elements, the `:disabled` pseudo class will match. If the attribute is not included, the `:enabled` pseudo class will match. If the element doesn't support the disabled attribute, the attribute will have no effect, including not leading to being matched by the `:disabled` and `:enabled` pseudo classes.

### Constraint validation

If the element is `disabled`, then the element's value cannot receive focus and cannot be updated by the user, and does not participate in constraint validation.

## Examples

When form controls are disabled, many browsers will display them in a lighter, grayed-out color by default. Here are examples of a disabled checkbox, radio button, `<option>` and `<optgroup>`, as well as some form controls that are disabled via the disabled attribute set on the ancestor ``<fieldset>`` element. The `<option>`s are disabled, but the `<select>` itself is not. We could have disable the entire `<select>` by adding the attribute to that element rather than its descendants.

```html
<fieldset>
  <legend>Checkboxes</legend>
  <p>
    <label>
      <input type="checkbox" name="ch-box" value="regular" /> Regular
    </label>
  </p>
  <p>
    <label>
      <input type="checkbox" name="ch-box" value="disabled" disabled /> disabled
    </label>
  </p>
</fieldset>

<fieldset>
  <legend>Radio buttons</legend>
  <p>
    <label> <input type="radio" name="radio" value="regular" /> Regular </label>
  </p>
  <p>
    <label>
      <input type="radio" name="radio" value="disabled" disabled /> disabled
    </label>
  </p>
</fieldset>

<p>
  <label
    >Select an option:
    <select>
      <optgroup label="Group 1">
        <option>Option 1.1</option>
      </optgroup>
      <optgroup label="Group 2">
        <option>Option 2.1</option>
        <option disabled>Option 2.2</option>
        <option>Option 2.3</option>
      </optgroup>
      <optgroup label="Group 3" disabled>
        <option>Disabled 3.1</option>
        <option>Disabled 3.2</option>
        <option>Disabled 3.3</option>
      </optgroup>
    </select>
  </label>
</p>

<fieldset disabled>
  <legend>Disabled fieldset</legend>
  <p>
    <label>
      Name: <input type="radio" name="radio" value="regular" /> Regular
    </label>
  </p>
  <p>
    <label>Number: <input type="number" /></label>
  </p>
</fieldset>
```

## See also

- `:disabled` and `:enabled`
