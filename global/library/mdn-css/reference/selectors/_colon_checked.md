---
title: "`:checked` CSS pseudo-class"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/selectors/_colon_checked/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `:checked` CSS pseudo-class

The **`:checked`** CSS pseudo-class selector represents any **radio** (``), **checkbox** (``), or **option** (`<option>` in a `<select>` element) that is checked or toggled to an `on` state.

```css
label {
  display: block;
  margin-top: 0.5em;
}

fieldset {
  margin-top: 0.5em;
}

input:checked {
  border: none;
  outline: 2px solid deeppink;
}
```

```html
<label for="name">Name (required):</label>
<input id="name" name="name" type="text" required />

<label for="birth">Date of birth:</label>
<input id="birth" name="birth" type="date" />

<label for="origin">How did you find out about us? (required)</label>
<select id="origin" name="origin" required>
  <option value="">Choose an option</option>
  <option value="google">Google</option>
  <option value="facebook">Facebook</option>
  <option value="advertisement">Advertisement</option>
</select>

<fieldset>
  <legend>Preferred contact method:</legend>
  <label>
    <input name="contact" type="radio" value="email" checked /> Email
  </label>
  <label><input name="contact" type="radio" value="phone" /> Phone</label>
</fieldset>

<label>
  <input name="newsletter" type="checkbox" checked /> I want to subscribe to a
  personalized newsletter.
</label>
<label>
  <input name="privacy" type="checkbox" required /> I have read and I agree to
  the Privacy Policy (required).
</label>
```

The user can engage this state by checking/selecting an element, or disengage it by unchecking/deselecting the element.

> **Note:**
> Because browsers often treat `<option>`s as replaced elements, the extent to which they can be styled with the `:checked` pseudo-class varies from browser to browser. Customizable select element functionality can be used to enable full customization of `<option>` elements just like any regular DOM element, in supporting browsers.

## Syntax

```css
:checked {
  /* ... */
}
```

## Examples

### Basic <example-value>

#### HTML

```html
<div>
  <input type="radio" name="my-input" id="yes" value="yes" />
  <label for="yes">Yes</label>

  <input type="radio" name="my-input" id="no" value="no" />
  <label for="no">No</label>
</div>

<div>
  <input type="checkbox" name="my-checkbox" id="opt-in" />
  <label for="opt-in">Check me!</label>
</div>

<select name="my-select" id="fruit">
  <option value="opt1">Apples</option>
  <option value="opt2">Grapes</option>
  <option value="opt3">Pears</option>
</select>
```

#### CSS

```css
div,
select {
  margin: 8px;
}

/* Labels for checked inputs */
input:checked + label {
  color: red;
}

/* Radio element, when checked */
input[type="radio"]:checked {
  box-shadow: 0 0 0 3px orange;
}

/* Checkbox element, when checked */
input[type="checkbox"]:checked {
  box-shadow: 0 0 0 3px hotpink;
}

/* Option elements, when selected */
option:checked {
  box-shadow: 0 0 0 3px lime;
  color: red;
}
```

#### Result

### Toggling elements with a hidden checkbox

This example utilizes the `:checked` pseudo-class to let the user toggle content based on the state of a checkbox, all without using JavaScript.

#### HTML

```html
<input type="checkbox" id="expand-toggle" />

<table>
  <thead>
    <tr>
      <th>Column #1</th>
      <th>Column #2</th>
      <th>Column #3</th>
    </tr>
  </thead>
  <tbody>
    <tr class="expandable">
      <td>[more text]</td>
      <td>[more text]</td>
      <td>[more text]</td>
    </tr>
    <tr>
      <td>[cell text]</td>
      <td>[cell text]</td>
      <td>[cell text]</td>
    </tr>
    <tr>
      <td>[cell text]</td>
      <td>[cell text]</td>
      <td>[cell text]</td>
    </tr>
    <tr class="expandable">
      <td>[more text]</td>
      <td>[more text]</td>
      <td>[more text]</td>
    </tr>
    <tr class="expandable">
      <td>[more text]</td>
      <td>[more text]</td>
      <td>[more text]</td>
    </tr>
  </tbody>
</table>

<label for="expand-toggle" id="expand-btn">Toggle hidden rows</label>
```

#### CSS

```css
/* Hide the toggle checkbox */
#expand-toggle {
  display: none;
}

/* Hide expandable content by default */
.expandable {
  visibility: collapse;
  background: #dddddd;
}

/* Style the button */
#expand-btn {
  display: inline-block;
  margin-top: 12px;
  padding: 5px 11px;
  background-color: #ffff77;
  border: 1px solid;
  border-radius: 3px;
}

/* Show hidden content when the checkbox is checked */
#expand-toggle:checked ~ * .expandable {
  visibility: visible;
}

/* Style the button when the checkbox is checked */
#expand-toggle:checked ~ #expand-btn {
  background-color: #cccccc;
}
```

#### Result

## See also

- Web forms — working with user data
- Styling web forms
- Related HTML elements: ``, ``, `<select>`, and `<option>`
- Replaced elements
