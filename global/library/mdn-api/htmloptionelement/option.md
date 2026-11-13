---
title: "HTMLOptionElement: Option() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmloptionelement/option/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLOptionElement: Option() constructor

The **`Option()`** constructor creates a new
`HTMLOptionElement`.

## Syntax

```js
new Option()
new Option(text)
new Option(text, value)
new Option(text, value, defaultSelected)
new Option(text, value, defaultSelected, selected)
```

### Parameters

- `text` (optional)
    A string representing the content of the element, i.e., the
    displayed text. If this is not specified, a default value of "" (empty string) is
    used.
- `value` (optional)
    A string representing the value of the
    `HTMLOptionElement`, i.e., the value attribute of the equivalent
    `<option>`. If this is not specified, the value of text is used as the
    value, e.g., for the associated `<select>` element's value when the form
    is submitted to the server.
- `defaultSelected` (optional)
    A value of either `true` or `false` that sets the `selected`
    attribute value, i.e., so that this `<option>` will be the default value
    selected in the `<select>` element when the page is first loaded. If
    this is not specified, a default value of false is used. Note that a value of true
    does not set the option to selected if it is not already selected.
- `selected` (optional)
    A value of either `true` or `false` that sets the option's selected state; the default is false
    (not selected). If omitted, even if the defaultSelected argument is true, the option
    is not selected.

## Examples

### Just add new options

```js
/* assuming we have the following HTML
<select id='s'>

</select>
*/

const s = document.getElementById("s");
const options = [Four, Five, Six];

options.forEach((element, key) => {
  s[key] = new Option(element, key);
});
```

### Append options with different parameters

```html
<select id="s"></select>
```

```js
const s = document.getElementById("s");
const options = ["zero", "one", "two"];

options.forEach((element, key) => {
  if (element === "zero") {
    s[key] = new Option(element, s.options.length, false, false);
  }
  if (element === "one") {
    s[key] = new Option(element, s.options.length, true, false); // Will add the "selected" attribute
  }
  if (element === "two") {
    s[key] = new Option(element, s.options.length, false, true); // Will actually be selected in the view
  }
});
```

Result:

```html
<select id="s">
  <option value="0">zero</option>
  <option value="1" selected>one</option>
  <option value="2">two</option>
  <!-- User will see two as 'selected' -->
</select>
```
