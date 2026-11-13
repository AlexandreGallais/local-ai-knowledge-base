---
title: "HTMLInputElement: labels property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlinputelement/labels/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLInputElement: labels property

The **`HTMLInputElement.labels`** read-only property returns a `NodeList` of the `` elements associated with the `` element.
If the element has the type `hidden`, the property returns `null`.

## Value

A `NodeList`, or `null` if the element's type is `hidden`.

## Examples

### HTML

```html
<label id="label1" for="test">Label 1</label>
<input id="test" />
<label id="label2" for="test">Label 2</label>
```

### JavaScript

```js
const input = document.getElementById("test");
for (const label of input.labels) {
  console.log(label.textContent); // "Label 1" and "Label 2"
}
```
