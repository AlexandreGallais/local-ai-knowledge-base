---
title: "`:default` CSS pseudo-class"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/selectors/_colon_default/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `:default` CSS pseudo-class

The **`:default`** CSS pseudo-class selects form elements that are the default in a group of related elements.

```css
label {
  display: block;
  margin-top: 0.5em;
}

fieldset {
  margin-top: 0.5em;
}

input:default {
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

What this selector matches is defined in HTML Standard §4.16.3 Pseudo-classes — it may match the ``, ``, ``, and `<option>` elements:

- A default option element is the first one with the `selected` attribute, or the first enabled option in DOM order. `multiple` `<select>`s can have more than one `selected` option, so all will match `:default`.
- `` and `` match if they have the `checked` attribute.
- `` matches if it is a `<form>`'s default submission button: the first `` in DOM order that belongs to the form. This also applies to `` types that submit forms, like `image` or `submit`.

## Syntax

```css
:default {
  /* ... */
}
```

## Examples

### HTML

```html
<fieldset>
  <legend>Favorite season</legend>

  <input type="radio" name="season" id="spring" value="spring" />
  <label for="spring">Spring</label>

  <input type="radio" name="season" id="summer" value="summer" checked />
  <label for="summer">Summer</label>

  <input type="radio" name="season" id="fall" value="fall" />
  <label for="fall">Fall</label>

  <input type="radio" name="season" id="winter" value="winter" />
  <label for="winter">Winter</label>
</fieldset>
```

### CSS

```css
input:default {
  box-shadow: 0 0 2px 1px coral;
}

input:default + label {
  color: coral;
}
```

## See also

- Web forms — Working with user data
- Styling web forms
- Related HTML elements: ``, ``, ``, and `<option>`
