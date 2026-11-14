---
title: "`maxlength` HTML attribute"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/attributes/maxlength/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `maxlength` HTML attribute

The **`maxlength`** attribute defines the maximum string length that the user can enter into an `` or `<textarea>`. The attribute must have an integer value of 0 or higher.

The length is measured in UTF-16 code units, which is often but not always equal to the number of characters. If no `maxlength` is specified, or an invalid value is specified, the input has no maximum length.

Any `maxlength` value must be greater than or equal to the value of `minlength`, if present and valid. The input will fail constraint validation if the length of the text value of the field is greater than maxlength UTF-16 code units long. Constraint validation is only applied when the value is changed by the user.

```html
<label for="name">Product name:</label>
<input
  id="name"
  name="name"
  type="text"
  value="Shampoo"
  minlength="3"
  maxlength="20"
  required />

<label for="description">Product description:</label>
<textarea
  id="description"
  name="description"
  minlength="10"
  maxlength="40"
  required></textarea>
```

```css
label {
  display: block;
  margin-top: 1em;
}

input:valid,
textarea:valid {
  background-color: palegreen;
}
```

## Description

### Constraint validation

While the browser will generally prevent user from entering more text than the maxlength attribute allows, should the length be longer than the maxlength allows, the read-only `tooLong` property of a `ValidityState` object will be true.

## Examples

```html
<input type="<example-value>" <example-value>"<example-value>" />
```

## See also

- `minlength`
- `size`
- `pattern`
- Constraint validation
- Form validation
- ``
