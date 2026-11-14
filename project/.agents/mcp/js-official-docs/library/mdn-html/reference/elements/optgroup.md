---
title: "`<optgroup>` HTML option group element"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/optgroup/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<optgroup>` HTML option group element

The **`<optgroup>`** HTML element creates a grouping of options within a `<select>` element.

```html
<label for="dino-select">Choose a dinosaur:</label>
<select id="dino-select">
  <optgroup label="Theropods">
    <option>Tyrannosaurus</option>
    <option>Velociraptor</option>
    <option>Deinonychus</option>
  </optgroup>
  <optgroup label="Sauropods">
    <option>Diplodocus</option>
    <option>Saltasaurus</option>
    <option>Apatosaurus</option>
  </optgroup>
</select>
```

```css
label {
  display: block;
  margin-bottom: 10px;
}
```

## Attributes

This element includes the global attributes.

- `disabled`
    If this Boolean attribute is set, none of the items in this option group is selectable. Often browsers gray out such control and it won't receive any browsing events, like mouse clicks or focus-related ones.
- `label`
    The name of the group of options, which the browser can use when labeling the options in the user interface. This attribute is mandatory if this element is used.

## Usage notes

Optgroup elements may not be nested.

In customizable `<select>` elements, the `<legend>` element is allowed as a child of `<optgroup>`, to provide a label that is easy to target and style. This replaces any text set in the `<optgroup>` element's `label` attribute, and it has the same semantics.

## Examples

```html
<select>
  <optgroup label="Group 1">
    <option>Option 1.1</option>
  </optgroup>
  <optgroup label="Group 2">
    <option>Option 2.1</option>
    <option>Option 2.2</option>
  </optgroup>
  <optgroup label="Group 3" disabled>
    <option>Option 3.1</option>
    <option>Option 3.2</option>
    <option>Option 3.3</option>
  </optgroup>
</select>
```

## Technical summary

       |
        Content categories

       | None.

       | Permitted content
       | Zero or more `<option>` elements. In customizable select elements, a `<legend>` element is permitted as a child of `<optgroup>`.

       | Tag omission
       |
        The start tag is mandatory. The end tag is optional if this element is
        immediately followed by another `&#x3C;optgroup>` element, or
        if the parent element has no more content.

       | Permitted parents
       | A `<select>` element.

       | Implicit ARIA role
       | `group`

       | Permitted ARIA roles
       | No `role` permitted

       | DOM interface
       | `HTMLOptGroupElement`

## See also

- Other form-related elements: `<form>`, `<legend>`, ``, ``, `<select>`, `<datalist>`, `<option>`, `<fieldset>`, `<textarea>`, ``, `<output>`, `<progress>` and `<meter>`.
- Customizable select elements
