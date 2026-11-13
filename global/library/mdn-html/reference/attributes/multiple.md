---
title: "`multiple` HTML attribute"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/attributes/multiple/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `multiple` HTML attribute

The Boolean **`multiple`** attribute, if set, means the form control accepts one or more values. The attribute is valid for the `<email>` and `<file>` input types and the `<select>`. The manner by which the user opts for multiple values depends on the form control.

```html
<label for="recipients">Where should we send the receipt?</label>
<input id="recipients" name="recipients" type="email" multiple />

<label for="shakes">Which shakes would you like to order?</label>
<select id="shakes" name="shakes" multiple>
  <option>Vanilla Shake</option>
  <option>Strawberry Shake</option>
  <option>Chocolate Shake</option>
</select>

<label for="payment">How would you like to pay?</label>
<select id="payment" name="payment">
  <option>Credit card</option>
  <option>Bank Transfer</option>
</select>
```

```css
label {
  display: block;
  margin-top: 1em;
}

input,
select {
  width: 100%;
}

input:invalid {
  background-color: lightpink;
}
```

## Overview

Depending on the type, the form control may have a different appearance if the `multiple` attribute is set. For the file input type, the native messaging the browser provides differs. In Firefox, the file input reads "No files selected" when the attribute is present and "No file selected" when it is not. Most browsers display a scrolling list box for a `<select>` control with the `multiple` attribute set and a single line dropdown when the attribute is omitted. The `<email>` input displays the same whether or not the `multiple` attribute is included, but will match the `:invalid` pseudo-class if more than one comma-separated email address is included if the attribute is not present.

When `multiple` is set on the `<email>` input type, the user can include zero (if not also `required`), one or more comma-separated email addresses.

```html
<input type="email" multiple name="emails" id="emails" />
```

If and only if the `multiple` attribute is specified, the value can be a list of properly-formed comma-separated email addresses. Any trailing and leading whitespace is removed from each address in the list.

When `multiple` is set on the `<file>` input type, the user can select one or more files. The user can choose multiple files from the file picker in any way that their chosen platform allows (e.g., by holding down `Shift` or `Control`, and then clicking).

```html
<input type="file" multiple name="uploads" id="uploads" />
```

When the attribute is omitted, the user can only select a single file per ``.

The `multiple` attribute on the `<select>` element represents a control for selecting zero or more options from the list of options. Otherwise, the `<select>` element represents a control for selecting a single `<option>` from the list of options.

```html
<select multiple name="dwarfs" id="dwarfs">
  <option>Grumpy</option>
  <option>Happy</option>
  <option>Sleepy</option>
  <option>Bashful</option>
  <option>Sneezy</option>
  <option>Dopey</option>
  <option>Doc</option>
</select>
```

When `multiple` is specified, most browsers will show a scrolling list box instead of a single line dropdown.

Multiple selected options are submitted using the `URLSearchParams` array convention, i.e., `name=value1&name=value2`.

## Accessibility concerns

Provide instructions to help users understand how to complete the form and use individual form controls. Indicate any required and optional input, data formats, and other relevant information. When using the `multiple` attribute, inform the user that multiple values are allowed and provide directions on how to provide multiple values, such as "separate email addresses with a comma."

Setting `size="1"` on a multiple select (i.e., `<select multiple size="1">`) renders a drop-down that lets users select multiple options. Some browsers don't expand the option list when the control is active, displaying multiple options in a menu list the height of a single-line box. This harms usability. When including a multiple-select, inform users they can select more than one option, even when multiple options are displayed.

## Examples

### email input

```html
<label for="emails">Who do you want to email?</label>
<input
  type="email"
  multiple
  name="emails"
  id="emails"
  list="dwarf-emails"
  required
  size="64" />

<datalist id="dwarf-emails">
  <option value="user@example.com">Grumpy</option>
  <option value="user@example.com">Happy</option>
  <option value="user@example.com">Sleepy</option>
  <option value="user@example.com">Bashful</option>
  <option value="user@example.com">Sneezy</option>
  <option value="user@example.com">Dopey</option>
  <option value="user@example.com">Doc</option>
</datalist>
```

```css
input:invalid {
  border: red solid 3px;
}
```

If and only if the `multiple` attribute is specified, the value can be a list of properly-formed comma-separated email addresses. Any trailing and leading whitespace is removed from each address in the list. If the `required` attribute is present, at least one email address is required.

Some browsers support the appearance of the `list` of options from the associated `<datalist>` for subsequent email addresses when `multiple` is present. Others do not.

### file input

When `multiple` is set on the `<file>` input type, the user can select one or more files:

```html
<p>
  <label for="uploads"> Choose the images you want to upload: </label>
  <input
    type="file"
    id="uploads"
    name="uploads"
    accept=".jpg, .jpeg, .png, .svg, .gif"
    multiple />
</p>
<p>
  <label for="text">Pick a text file to upload: </label>
  <input type="file" id="text" name="text" accept=".txt" />
</p>
```

Note the difference in appearance between the example with `multiple` set and the other `file` input without.

If these inputs are included in a form submitted using `method="get"`, each selected file's name is added to URL parameters as `?uploads=img1.jpg&uploads=img2.svg`. To submit the files as multipart form data, use `method="post"` and `enctype="multipart/form-data"`. See the `<form>` element and sending form data for more information.

### select

The `multiple` attribute on the `<select>` element represents a control for selecting zero or more options from the list of options. Otherwise, the `<select>` element represents a control for selecting a single `<option>` from the list of options. The control generally has a different appearance based on the presence of the multiple attribute, with most browsers displaying a scrolling list box instead of a single line dropdown when the attribute is present.

```html
<p>
  <label for="dwarfs">Select the dwarf woodsman you like:</label>
  <select multiple name="dwarfs" id="dwarfs">
    <option>user@example.com</option>
    <option>user@example.com</option>
    <option>user@example.com</option>
    <option>user@example.com</option>
    <option>user@example.com</option>
    <option>user@example.com</option>
    <option>user@example.com</option>
  </select>
</p>
<p>
  <label for="favoriteOnly">Select your favorite:</label>
  <select name="favoriteOnly" id="favoriteOnly">
    <option>user@example.com</option>
    <option>user@example.com</option>
    <option>user@example.com</option>
    <option>user@example.com</option>
    <option>user@example.com</option>
    <option>user@example.com</option>
    <option>user@example.com</option>
  </select>
</p>
```

Note the difference in appearance between the two form controls.

```css
/* uncomment this CSS to make the multiple the same height as the single */

/*
select[multiple] {
  height: 1.5em;
  vertical-align: top;
}
select[multiple]:focus,
select[multiple]:active {
  height: auto;
}
*/
```

There are a few ways to select multiple options in a `<select>` element with a `multiple` attribute. Depending on the operating system, mouse users can hold the `Ctrl`, `Command`, or `Shift` keys and then click multiple options to select/deselect them. Keyboard users can select multiple contiguous items by focusing on the `<select>` element, selecting an item at the top or bottom of the range they want to select using the `Up` and `Down` cursor keys to go up and down the options. The selection of non-contiguous is not as well-supported: items should be able to be selected and deselected by pressing `Space`, but support varies between browsers.

## See also

- ``
- `<select>`
- Allowing multiple email addresses
