---
title: "HTMLSelectElement: options property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlselectelement/options/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLSelectElement: options property

The **`HTMLSelectElement.options`** read-only property returns
a `HTMLOptionsCollection` of the `<option>` elements
contained by the `<select>` element.

## Value

A `HTMLOptionsCollection` containing the `<option>`
elements contained by the `<select>` element.

## Examples

### HTML

```html
<label for="test">Label</label>
<select id="test">
  <option value="1">Option 1</option>
  <option value="2">Option 2</option>
</select>
```

### JavaScript

```js
const select = document.getElementById("test");
for (const option of select.options) {
  console.log(option.label); // "Option 1" and "Option 2"
}
```
