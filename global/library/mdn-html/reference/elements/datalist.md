---
title: "`<datalist>` HTML data list element"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/datalist/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<datalist>` HTML data list element

The **`<datalist>`** HTML element contains a set of `<option>` elements that represent the permissible or recommended options available to choose from within other controls.

```html
<label for="ice-cream-choice">Choose a flavor:</label>
<input list="ice-cream-flavors" id="ice-cream-choice" name="ice-cream-choice" />

<datalist id="ice-cream-flavors">
  <option value="Chocolate"></option>
  <option value="Coconut"></option>
  <option value="Mint"></option>
  <option value="Strawberry"></option>
  <option value="Vanilla"></option>
</datalist>
```

```css
label {
  display: block;
  margin-bottom: 10px;
}
```

## Attributes

This element has no other attributes than the global attributes, common to all elements.

## Usage notes

To bind the `<datalist>` element to the control, we give it a unique identifier in the `id` attribute, and then add the `list` attribute to the `` element with the same identifier as value.
Only certain types of `` support this behavior, and it can also vary from browser to browser.

Each `<option>` element should have a `value` attribute, which represents a suggestion to be entered into the input. It can also have a `label` attribute, or, missing that, some text content, which may be displayed by the browser instead of `value` (Firefox), or in addition to `value` (Chrome and Safari, as supplemental text). The exact content of the drop-down menu depends on the browser, but when clicked, content entered into control field will always come from the `value` attribute.

> **Note:**
> `<datalist>` is not a replacement for `<select>`. A `<datalist>` does not represent an input itself; it is a list of suggested values for an associated control. The control can still accept any value that passes validation, even if it is not in this suggestion list.

## Accessibility

When deciding to use the `<datalist>` element, here are some accessibility issues to be mindful of:

- The font size of the data list's options does not zoom, always remaining the same size. The contents of the autosuggest do not grow or shrink when the rest of the contents are zoomed in or out.
- As targeting the list of options with CSS is very limited to non-existent, rendering cannot be styled for high-contrast mode.
- Some screen reader/browser combinations, including NVDA and Firefox, do not announce the contents of the autosuggest popup.

## Examples

### Textual types

Recommended values in types `<text>`, `<search>`, `<url>`, `<tel>`, `<email>` and `<number>`, are displayed in a drop-down menu when user clicks or double-clicks on the control.
Typically the right side of a control will also have an arrow pointing to the presence of predefined values.

```html
<label for="myBrowser">Choose a browser from this list:</label>
<input list="browsers" id="myBrowser" name="myBrowser" />
<datalist id="browsers">
  <option value="Chrome"></option>
  <option value="Firefox"></option>
  <option value="Opera"></option>
  <option value="Safari"></option>
  <option value="Microsoft Edge"></option>
</datalist>
```

### Date and Time types

The types `<month>`, `<week>`, `<date>`, `<time>` and `<datetime-local>` can show an interface that allows a convenient selection of a date and time.
Predefined values can be shown there, allowing the user to quickly fill the control value.

> **Note:**
> When these types are not supported, a basic `text` type will be rendered instead, creating a text field. That field will correctly recognize recommended values and display them to the user in a drop-down menu.

```html
<input type="time" list="popularHours" />
<datalist id="popularHours">
  <option value="12:00"></option>
  <option value="13:00"></option>
  <option value="14:00"></option>
</datalist>
```

### Range type

When `value` attributes are included on `<option>` elements provided for a datalist associated with a `<range>` input type, they will be shown as a series of tick marks that the user can easily select.

```html
<label for="tick">Tip amount:</label>
<input type="range" list="tickmarks" min="0" max="100" id="tick" name="tick" />
<datalist id="tickmarks">
  <option value="0" label="0%"></option>
  <option value="10" label="Minimum Tip"></option>
  <option value="20" label="Standard"></option>
  <option value="30" label="Generous"></option>
  <option value="50" label="Very Generous"></option>
</datalist>
```

> **Note:**
> The `label` attribute is intended to provide labels for tick marks, as defined in the HTML Standard. However, current browser support varies; labels might not be displayed visually or as tooltips.

### Color type

The `<color>` type can show predefined colors in a browser-provided interface.

```html
<label for="colors">Pick a color (preferably a red tone):</label>
<input type="color" list="redColors" id="colors" />
<datalist id="redColors">
  <option value="#800000"></option>
  <option value="#8B0000"></option>
  <option value="#A52A2A"></option>
  <option value="#DC143C"></option>
</datalist>
```

## Technical summary

       |
        Content categories

       |
        Flow content,
        phrasing content.

       | Permitted content
       |
        Either
        phrasing content
        or zero or more `<option>` elements.

       | Tag omission
       | None, both the starting and ending tag are mandatory.

       | Permitted parents
       |
        Any element that accepts
        phrasing content.

       | Implicit ARIA role
       |
        listbox

       | Permitted ARIA roles
       | No `role` permitted

       | DOM interface
       | `HTMLDataListElement`

## See also

- The `` element, and more specifically its `list` attribute;
- The `<option>` element.
