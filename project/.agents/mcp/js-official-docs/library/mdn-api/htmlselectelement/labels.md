---
title: "HTMLSelectElement: labels property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlselectelement/labels/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLSelectElement: labels property

The **`HTMLSelectElement.labels`** read-only property returns a
`NodeList` of the `` elements associated with the
`<select>` element.

## Value

A `NodeList` containing the `` elements associated
with the `<select>` element.

## Examples

### HTML

```html
<label id="label1" for="test">Label 1</label>
<select id="test">
  <option value="1">Option 1</option>
  <option value="2">Option 2</option>
</select>
<label id="label2" for="test">Label 2</label>
```

### JavaScript

```js
const select = document.getElementById("test");
for (const label of select.labels) {
  console.log(label.textContent); // "Label 1" and "Label 2"
}
```
