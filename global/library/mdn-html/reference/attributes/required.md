---
title: "`required` HTML attribute"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/attributes/required/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `required` HTML attribute

The Boolean **`required`** attribute, if present, indicates that the user must specify a value for the input before the owning form can be submitted.

The `required` attribute is supported by ``<text>``, ``<search>``, ``<url>``, ``<tel>``, ``<email>``, ``<password>``, ``<date>``, ``<month>``, ``<week>``, ``<time>``, ``<datetime-local>``, ``<number>``, ``<checkbox>``, ``<radio>``, ``<file>``, `` types along with the `<select>` and `<textarea>` form control elements. If present on any of these input types and elements, the `:required` pseudo class will match. If the attribute is not included, the `:optional` pseudo class will match.

The attribute is not supported on, or relevant to, `<range>` and `<color>` input types, as both have default values. Type `color` defaults to `#000000`. Type `range` defaults to the midpoint between `min` and `max` — with `min` and `max` defaulting to 0 and 100 respectively in most browsers if not declared. `required` is also not supported on the `<hidden>` input type — users cannot be expected to fill out a hidden form field. Finally, `required` is not supported on any button input types, including `<image>`.

In the case of a same named group of `<radio>` buttons, if a single radio button in the group has the `required` attribute, a radio button in that group must be checked, although it doesn't have to be the one on which the attribute is applied. To improve code maintenance, it is recommended to either include the `required` attribute in every same-named radio button in the group, or else in none.

In the case of a same named group of `<checkbox>` input types, only the checkboxes with the `required` attribute are required.

> **Note:**
> Setting `aria-required="true"` tells a screen reader that an element (any element) is required, but has no bearing on the optionality of the element.

## Description

### Attribute interactions

Because a read-only field cannot be changed, `required` does not have any effect on inputs with the `readonly` attribute also specified.

### Usability

When including the `required` attribute, provide a visible indication near the control informing the user that the ``, `<select>` or `<textarea>` is required. In addition, target required form controls with the `:required` pseudo-class, styling them in a way to indicate they are required. This improves usability for sighted users. Assistive technology should inform the user that the form control is mandatory based on the required attribute, but adding `aria-required="true"` doesn't hurt, in case the browser / screen reader combination does not support `required` yet.

### Constraint validation

If the element is required and the element's value is the empty string, then the element is suffering from `valueMissing` and the element will match the `:invalid` pseudo class.

## Accessibility concerns

Provide an indication to users informing them the form control is required. Ensure the messaging is multi-faceted, such as through text, color, markings, and attribute, so that all users understand the requirements whether they have color blindness, cognitive differences, or are using a screen reader.

## Example

### HTML

```html
<form>
  <div class="group">
    <input type="text" />
    <label>Normal</label>
  </div>
  <div class="group">
    <input type="text" required />
    <label>Required</label>
  </div>
  <input type="submit" />
</form>
```

```js
document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();
});
```

## See also

- `validityState.valueMissing`
- `:required` and `:optional`
- ``
- `<select>`
