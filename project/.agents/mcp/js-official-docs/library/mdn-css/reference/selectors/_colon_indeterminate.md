---
title: "`:indeterminate` CSS pseudo-class"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/selectors/_colon_indeterminate/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `:indeterminate` CSS pseudo-class

The **`:indeterminate`** CSS pseudo-class represents any form element whose state is indeterminate, such as checkboxes that have been set to an `indeterminate` state with JavaScript, radio buttons which are members of a group in which all radio buttons are unchecked, and `<progress>` elements with no `value` attribute.

```css
/* Selects any <input> whose state is indeterminate */
input:indeterminate {
  background: lime;
}
```

Elements targeted by this selector are:

- `` elements with the `indeterminate` property set to `true`.
- `` elements with the same `name` value and none of them `checked`.
- `<progress>` elements with no `value`, placing them in an indeterminate state.

## Syntax

```css
:indeterminate {
  /* ... */
}
```

## Examples

### Checkbox & radio button

This example applies special styles to the labels associated with indeterminate form fields.

#### HTML

```html
<fieldset>
  <legend>Checkbox</legend>
  <div>
    <input type="checkbox" id="checkbox" />
    <label for="checkbox">This checkbox label starts out lime.</label>
  </div>
</fieldset>

<fieldset>
  <legend>Radio</legend>
  <div>
    <input type="radio" id="radio1" name="radioButton" value="val1" />
    <label for="radio1">First radio label starts out lime.</label>
  </div>
  <div>
    <input type="radio" id="radio2" name="radioButton" value="val2" />
    <label for="radio2">Second radio label also starts out lime.</label>
  </div>
</fieldset>
```

#### CSS

```css
input:indeterminate + label {
  background: lime;
}
```

```css
fieldset {
  padding: 1em 0.75em;
}

fieldset:first-of-type {
  margin-bottom: 1.5rem;
}

fieldset:not(:first-of-type) > div:not(:last-child) {
  margin-bottom: 0.5rem;
}
```

#### JavaScript

```js
const inputs = document.getElementsByTagName("input");

for (const input of inputs) {
  input.indeterminate = true;
}
```

#### Result

### Progress bar

#### HTML

```html
<progress></progress>
```

#### CSS

```css
progress {
  margin: 4px;
}

progress:indeterminate {
  width: 80vw;
  height: 20px;
}
```

#### Result

## See also

- Web forms — Working with user data
- Styling web forms
- The `` element's `indeterminate` property
- `` and the `HTMLInputElement` interface which implements it.
- The `:checked` CSS selector lets you style checkboxes based on whether they're checked or not
