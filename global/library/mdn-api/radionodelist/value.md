---
title: "RadioNodeList: value property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/radionodelist/value/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RadioNodeList: value property

If the underlying element collection contains radio buttons, the
**`RadioNodeList.value`** property represents the checked radio
button. On retrieving the `value` property, the `value` of the
currently `checked` radio button is returned as a string. If the collection
does not contain any radio buttons or none of the radio buttons in the collection is in
`checked` state, the empty string is returned. On setting the
`value` property, the first radio button input element whose
`value` property is equal to the new value will be set to
`checked`.

## Example

### HTML

```html
<form>
  <label><input type="radio" name="color" value="blue" />Blue</label>
  <label><input type="radio" name="color" value="red" />Red</label>
</form>
```

### JavaScript

```js
// Get the form
const form = document.forms[0];

// Get the form's radio buttons
const radios = form.elements["color"];

// Choose the "red" option
radios.value = "red";
```

## See also

- The `<form>`, `<fieldset>`, ``
  elements.
