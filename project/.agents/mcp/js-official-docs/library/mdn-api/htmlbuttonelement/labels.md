---
title: "HTMLButtonElement: labels property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlbuttonelement/labels/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLButtonElement: labels property

The **`HTMLButtonElement.labels`** read-only property returns a
`NodeList` of the `` elements associated with the
`` element.

## Value

A `NodeList` containing the `` elements associated
with the `` element.

## Examples

### HTML

```html
<label id="label1" for="test">Label 1</label>
<button id="test">Button</button>
<label id="label2" for="test">Label 2</label>
```

### JavaScript

```js
const button = document.getElementById("test");
for (const label of button.labels) {
  console.log(label.textContent); // "Label 1" and "Label 2"
}
```
